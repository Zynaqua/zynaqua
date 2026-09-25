package com.zynaqua.enquiry.repository;

import com.zynaqua.enquiry.entity.Enquiry;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long>, JpaSpecificationExecutor<Enquiry> {

    long countByStatus(EnquiryStatus status);

    List<Enquiry> findTop10ByOrderByCreatedAtDesc();
}