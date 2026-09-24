package com.zynaqua.enquiry.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.enquiry.dto.LeadRequestDTO;
import com.zynaqua.enquiry.dto.LeadResponseDTO;
import com.zynaqua.enquiry.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    public ResponseEntity<ApiResponse<LeadResponseDTO>> submitLead(
        @Valid @RequestBody LeadRequestDTO request
    ) {
        LeadResponseDTO response = leadService.submitLead(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success(
                "Your enquiry has been submitted successfully.",
                response
            ));
    }
}