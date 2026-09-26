package com.zynaqua.enquiry.service;

import com.zynaqua.common.exception.ResourceNotFoundException;
import com.zynaqua.common.response.PagedResponse;
import com.zynaqua.customer.entity.Customer;
import com.zynaqua.customer.service.CustomerService;
import com.zynaqua.enquiry.dto.*;
import com.zynaqua.enquiry.entity.Enquiry;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;
import com.zynaqua.enquiry.repository.EnquiryRepository;
import com.zynaqua.enquiry.specification.EnquirySpecification;
import com.zynaqua.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadService {

    private final CustomerService customerService;
    private final EnquiryRepository enquiryRepository;
    private final ProductRepository productRepository;

    @Transactional
    public LeadResponseDTO submitLead(LeadRequestDTO request) {
        log.info("Processing lead submission: type={}, mobile={}",
            request.getEnquiryType(), request.getMobile());

        Customer customer = customerService.findOrCreate(request);

        Enquiry enquiry = Enquiry.builder()
            .customer(customer)
            .enquiryType(request.getEnquiryType())
            .productId(request.getProductId())
            .build();

        Enquiry saved = enquiryRepository.save(enquiry);

        log.info("Enquiry saved: enquiryId={}, customerId={}, type={}",
            saved.getId(), customer.getId(), saved.getEnquiryType());

        return new LeadResponseDTO(
            saved.getId(),
            customer.getId(),
            saved.getEnquiryType(),
            saved.getStatus(),
            saved.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public PagedResponse<LeadListItemDTO> searchLeads(
            String search, EnquiryStatus status, EnquiryType type,
            String city, LocalDateTime dateFrom, LocalDateTime dateTo, Pageable pageable
    ) {
        Specification<Enquiry> spec = Specification
                .where(EnquirySpecification.fetchCustomer())
                .and(EnquirySpecification.search(search))
                .and(EnquirySpecification.hasStatus(status))
                .and(EnquirySpecification.hasType(type))
                .and(EnquirySpecification.hasCity(city))
                .and(EnquirySpecification.createdBetween(dateFrom, dateTo));

        Page<Enquiry> page = enquiryRepository.findAll(spec, pageable);
        Page<LeadListItemDTO> dtoPage = page.map(this::toListItemDto);

        log.info("Admin lead search: search='{}', status={}, type={}, city='{}' -> {} results",
                search, status, type, city, dtoPage.getTotalElements());

        return PagedResponse.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public LeadDetailDTO getLeadDetail(Long enquiryId) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found: " + enquiryId));
        return toDetailDto(enquiry);
    }

    @Transactional
    public LeadDetailDTO updateStatus(Long enquiryId, EnquiryStatus newStatus) {
        // WHY no transition-graph validation here: V1 deliberately allows
        // any status -> any status, trusting admin staff judgement rather
        // than enforcing a state machine — see Day 9's interview notes for
        // the explicit trade-off if asked why NEW can jump straight to
        // CONVERTED.
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found: " + enquiryId));

        EnquiryStatus oldStatus = enquiry.getStatus();
        enquiry.setStatus(newStatus);
        Enquiry saved = enquiryRepository.save(enquiry);

        log.info("Enquiry status changed: enquiryId={}, {} -> {}", enquiryId, oldStatus, newStatus);

        return toDetailDto(saved);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        long total = enquiryRepository.count();
        long newCount = enquiryRepository.countByStatus(EnquiryStatus.NEW);
        long contacted = enquiryRepository.countByStatus(EnquiryStatus.CONTACTED);
        long demoScheduled = enquiryRepository.countByStatus(EnquiryStatus.DEMO_SCHEDULED);
        long demoCompleted = enquiryRepository.countByStatus(EnquiryStatus.DEMO_COMPLETED);
        long converted = enquiryRepository.countByStatus(EnquiryStatus.CONVERTED);

        List<LeadListItemDTO> recent = enquiryRepository.findTop10ByOrderByCreatedAtDesc().stream()
                .map(this::toListItemDto)
                .toList();

        return new DashboardStatsDTO(total, newCount, contacted, demoScheduled, demoCompleted, converted, recent);
    }

    private LeadListItemDTO toListItemDto(Enquiry enquiry) {
        Customer customer = enquiry.getCustomer();
        return new LeadListItemDTO(
                enquiry.getId(),
                customer.getId(),
                customer.getName(),
                customer.getMobile(),
                customer.getCity(),
                enquiry.getEnquiryType(),
                enquiry.getStatus(),
                enquiry.getCreatedAt()
        );
    }

    private LeadDetailDTO toDetailDto(Enquiry enquiry) {
        Customer customer = enquiry.getCustomer();

        String productName = null;
        if (enquiry.getProductId() != null) {
            productName = productRepository.findById(enquiry.getProductId())
                    .map(p -> p.getName())
                    .orElse(null); // product may have been deactivated/deleted — don't fail the whole detail view over it
        }

        return new LeadDetailDTO(
                enquiry.getId(),
                customer.getId(),
                customer.getName(),
                customer.getMobile(),
                customer.getEmail(),
                customer.getCity(),
                customer.getPincode(),
                customer.getAddress(),
                enquiry.getEnquiryType(),
                enquiry.getProductId(),
                productName,
                enquiry.getMessage(),
                enquiry.getStatus(),
                enquiry.getCreatedAt(),
                enquiry.getUpdatedAt()
        );
    }
}