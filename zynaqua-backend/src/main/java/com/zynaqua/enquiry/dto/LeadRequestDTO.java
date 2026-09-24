package com.zynaqua.enquiry.dto;

import com.zynaqua.enquiry.entity.EnquiryType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobile;

    @Email(message = "Enter a valid email address")
    @Size(max = 150)
    private String email; // optional — no @NotBlank

    @NotBlank(message = "City is required")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^\\d{6}$", message = "Pincode must be exactly 6 digits")
    private String pincode;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Enquiry type is required")
    private EnquiryType enquiryType;

    // Optional — populated when the enquiry originates from a product page (Day 6).
    private Long productId;
}