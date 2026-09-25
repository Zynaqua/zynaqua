package com.zynaqua.product.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProductRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 150)
    private String name;

    @Size(max = 180)
    private String slug;

    @Size(max = 300)
    private String shortDescription;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    private BigDecimal mrp;

    @Size(max = 100)
    private String category;

    private boolean isFeatured;

    @Valid
    private List<ImageInput> images;

    @Valid
    private List<FeatureInput> features;

    @Valid
    private List<SpecificationInput> specifications;

    @Getter
    @Setter
    public static class ImageInput {
        @NotBlank(message = "Image URL is required")
        private String imageUrl;
        private String altText;
        private int displayOrder;
        private boolean isPrimary;
    }

    @Getter
    @Setter
    public static class FeatureInput {
        @NotBlank(message = "Feature name is required")
        private String featureName;
        private String featureValue;
        private int displayOrder;
    }

    @Getter
    @Setter
    public static class SpecificationInput {
        @NotBlank(message = "Specification name is required")
        private String specificationName;
        @NotBlank(message = "Specification value is required")
        private String specificationValue;
        private int displayOrder;
    }
}