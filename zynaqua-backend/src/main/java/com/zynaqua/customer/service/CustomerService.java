package com.zynaqua.customer.service;

import com.zynaqua.customer.entity.Customer;
import com.zynaqua.customer.repository.CustomerRepository;
import com.zynaqua.enquiry.dto.LeadRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Customer findOrCreate(LeadRequestDTO request) {
        return customerRepository.findByMobile(request.getMobile())
            .map(existing -> {
                log.info("Existing customer found for mobile={}, customerId={}",
                    request.getMobile(), existing.getId());
                // Keep contact details fresh — a customer's city/address can
                // change between enquiries; we update rather than ignore.
                existing.setName(request.getName());
                existing.setEmail(request.getEmail());
                existing.setCity(request.getCity());
                existing.setPincode(request.getPincode());
                existing.setAddress(request.getAddress());
                return customerRepository.save(existing);
            })
            .orElseGet(() -> {
                Customer newCustomer = Customer.builder()
                    .name(request.getName())
                    .mobile(request.getMobile())
                    .email(request.getEmail())
                    .city(request.getCity())
                    .pincode(request.getPincode())
                    .address(request.getAddress())
                    .build();
                Customer saved = customerRepository.save(newCustomer);
                log.info("New customer created, customerId={}, mobile={}",
                    saved.getId(), saved.getMobile());
                return saved;
            });
    }
}