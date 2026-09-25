package com.zynaqua.enquiry.dto;

import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;

import java.time.LocalDateTime;

public record LeadResponseDTO(
    Long enquiryId,
    Long customerId,
    EnquiryType enquiryType,
    EnquiryStatus status,
    LocalDateTime createdAt
) {}