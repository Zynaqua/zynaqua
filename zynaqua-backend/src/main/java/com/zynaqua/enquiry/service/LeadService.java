package com.zynaqua.enquiry.service;

import com.zynaqua.common.exception.ResourceNotFoundException;
import com.zynaqua.common.response.PagedResponse;
import com.zynaqua.customer.entity.Customer;
import com.zynaqua.customer.service.CustomerService;
import com.zynaqua.enquiry.dto.*;
import com.zynaqua.enquiry.entity.Enquiry;
import com.zynaqua.enquiry.entity.EnquirySource;
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
        return createLead(request, EnquirySource.ONLINE);
    }

    @Transactional
    public LeadResponseDTO createLeadByAdmin(LeadRequestDTO request) {
        return createLead(request, EnquirySource.OFFLINE);
    }

    private LeadResponseDTO createLead(LeadRequestDTO request, EnquirySource source) {
        log.info("Processing lead submission: type={}, mobile={}, source={}",
                request.getEnquiryType(), request.getMobile(), source);

        Customer customer = customerService.findOrCreate(request);

        Enquiry enquiry = Enquiry.builder()
                .customer(customer)
                .enquiryType(request.getEnquiryType())
                .productId(request.getProductId())
                .source(source)
                .build();

        Enquiry saved = enquiryRepository.save(enquiry);

        log.info("Enquiry saved: enquiryId={}, customerId={}, type={}, source={}",
                saved.getId(), customer.getId(), saved.getEnquiryType(), saved.getSource());

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
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found: " + enquiryId));

        EnquiryStatus oldStatus = enquiry.getStatus();
        enquiry.setStatus(newStatus);
        Enquiry saved = enquiryRepository.save(enquiry);

        log.info("Enquiry status changed: enquiryId={}, {} -> {}", enquiryId, oldStatus, newStatus);

        return toDetailDto(saved);
    }

    @Transactional
    public LeadDetailDTO updateLead(Long enquiryId, LeadUpdateRequestDTO request) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found: " + enquiryId));

        Customer customer = enquiry.getCustomer();
        customer.setName(request.getName());
        customer.setMobile(request.getMobile());
        customer.setEmail(request.getEmail());
        customer.setCity(request.getCity());
        customer.setPincode(request.getPincode());
        customer.setAddress(request.getAddress());

        enquiry.setEnquiryType(request.getEnquiryType());
        enquiry.setProductId(request.getProductId());
        enquiry.setMessage(request.getMessage());
        enquiry.setStatus(request.getStatus());

        Enquiry saved = enquiryRepository.save(enquiry);

        log.info("Enquiry fully updated by admin: enquiryId={}, customerId={}",
                saved.getId(), customer.getId());

        return toDetailDto(saved);
    }

    @Transactional
    public void deleteLead(Long enquiryId) {
        if (!enquiryRepository.existsById(enquiryId)) {
            throw new ResourceNotFoundException("Enquiry not found: " + enquiryId);
        }
        enquiryRepository.deleteById(enquiryId);
        log.info("Enquiry deleted: enquiryId={}", enquiryId);
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
                enquiry.getSource(), // NEW
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
                    .orElse(null);
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
                enquiry.getSource(), // NEW
                enquiry.getProductId(),
                productName,
                enquiry.getMessage(),
                enquiry.getStatus(),
                enquiry.getCreatedAt(),
                enquiry.getUpdatedAt()
        );
    }
}