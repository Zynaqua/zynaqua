package com.zynaqua.product.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponseDTO(
        Long id,
        String name,
        String modelName,
        String slug,
        String shortDescription,
        String description,
        BigDecimal price,
        BigDecimal mrp,
        String category,
        boolean isFeatured,
        boolean isActive,

        List<ImageDTO> images,
        List<FeatureDTO> features,
        List<SpecificationDTO> specifications
) {
    public record ImageDTO(String imageUrl, String altText, boolean isPrimary) {}
    public record FeatureDTO(String featureName, String featureValue) {}
    public record SpecificationDTO(String specificationName, String specificationValue) {}
}