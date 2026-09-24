package com.zynaqua.enquiry.service;

import com.zynaqua.customer.entity.Customer;
import com.zynaqua.customer.service.CustomerService;
import com.zynaqua.enquiry.dto.LeadRequestDTO;
import com.zynaqua.enquiry.dto.LeadResponseDTO;
import com.zynaqua.enquiry.entity.Enquiry;
import com.zynaqua.enquiry.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadService {

    private final CustomerService customerService;
    private final EnquiryRepository enquiryRepository;

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
}