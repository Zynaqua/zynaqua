package com.zynaqua.customer.repository;

import com.zynaqua.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // WHY: mobile is our de-facto unique customer identifier for find-or-create.
    Optional<Customer> findByMobile(String mobile);
}