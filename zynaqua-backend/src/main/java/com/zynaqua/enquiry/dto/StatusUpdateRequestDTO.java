package com.zynaqua.enquiry.dto;

import com.zynaqua.enquiry.entity.EnquiryStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateRequestDTO {

    @NotNull(message = "Status is required")
    private EnquiryStatus status;
}