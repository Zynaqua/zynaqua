package com.zynaqua.enquiry.repository;

import com.zynaqua.enquiry.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

}