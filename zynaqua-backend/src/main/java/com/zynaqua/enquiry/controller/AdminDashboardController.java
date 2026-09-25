package com.zynaqua.enquiry.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.enquiry.dto.DashboardStatsDTO;
import com.zynaqua.enquiry.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final LeadService leadService;

    @GetMapping("/stats")
    public ApiResponse<DashboardStatsDTO> getStats() {
        return ApiResponse.success("Dashboard stats fetched successfully", leadService.getDashboardStats());
    }
}