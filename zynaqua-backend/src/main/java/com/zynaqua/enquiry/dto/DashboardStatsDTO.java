package com.zynaqua.enquiry.dto;

import java.util.List;

public record DashboardStatsDTO(
    long totalLeads,
    long newLeads,
    long contacted,
    long demoScheduled,
    long demoCompleted,
    long converted,
    List<LeadListItemDTO> recentEnquiries
) {}