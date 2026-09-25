package com.zynaqua.enquiry.dto;

import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;

import java.time.LocalDateTime;

public record LeadListItemDTO(
    Long enquiryId,
    Long customerId,
    String customerName,
    String customerMobile,
    String customerCity,
    EnquiryType enquiryType,
    EnquiryStatus status,
    LocalDateTime createdAt
) {}