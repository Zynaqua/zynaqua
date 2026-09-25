package com.zynaqua.enquiry.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.common.response.PagedResponse;
import com.zynaqua.enquiry.dto.LeadDetailDTO;
import com.zynaqua.enquiry.dto.LeadListItemDTO;
import com.zynaqua.enquiry.dto.StatusUpdateRequestDTO;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;
import com.zynaqua.enquiry.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
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
}