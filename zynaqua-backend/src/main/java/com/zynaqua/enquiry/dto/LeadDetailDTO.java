package com.zynaqua.enquiry.dto;

import com.zynaqua.enquiry.entity.EnquirySource;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;

import java.time.LocalDateTime;

public record LeadDetailDTO(
        Long enquiryId,
        Long customerId,
        String customerName,
        String customerMobile,
        String customerEmail,
        String customerCity,
        String customerPincode,
        String customerAddress,
        EnquiryType enquiryType,
        EnquirySource source,
        Long productId,
        String productName,
        String message,
        EnquiryStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}