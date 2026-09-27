package com.zynaqua.enquiry.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.common.response.PagedResponse;
import com.zynaqua.enquiry.dto.*;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;
import com.zynaqua.enquiry.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/leads")
@RequiredArgsConstructor
public class AdminLeadController {

    private final LeadService leadService;

    @GetMapping
    public ApiResponse<PagedResponse<LeadListItemDTO>> searchLeads(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(required = false) EnquiryType type,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        var result = leadService.searchLeads(search, status, type, city, dateFrom, dateTo, pageable);
        return ApiResponse.success("Leads fetched successfully", result);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LeadResponseDTO>> createLead(
            @Valid @RequestBody LeadRequestDTO request
    ) {
        LeadResponseDTO created = leadService.createLeadByAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lead created successfully", created));
    }

    @GetMapping("/{id}")
    public ApiResponse<LeadDetailDTO> getLeadDetail(@PathVariable Long id) {
        return ApiResponse.success("Lead detail fetched successfully", leadService.getLeadDetail(id));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<LeadDetailDTO> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequestDTO request
    ) {
        LeadDetailDTO updated = leadService.updateStatus(id, request.getStatus());
        return ApiResponse.success("Status updated successfully", updated);
    }

    @PutMapping("/{id}")
    public ApiResponse<LeadDetailDTO> updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadUpdateRequestDTO request
    ) {
        LeadDetailDTO updated = leadService.updateLead(id, request);
        return ApiResponse.success("Lead updated successfully", updated);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ApiResponse.success("Lead deleted successfully", null);
    }
}