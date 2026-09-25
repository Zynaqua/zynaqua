package com.zynaqua.product.service;

import com.zynaqua.common.exception.ResourceNotFoundException;
import com.zynaqua.product.dto.ProductResponseDTO;
import com.zynaqua.product.entity.Product;
import com.zynaqua.product.entity.ProductFeature;
import com.zynaqua.product.entity.ProductImage;
import com.zynaqua.product.entity.ProductSpecification;
import com.zynaqua.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findAllActive() {
        return productRepository.findByIsActiveTrue().stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findFeatured() {
        return productRepository.findByIsActiveTrueAndIsFeaturedTrue().stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO findBySlug(String slug) {
        Product product = productRepository.findBySlugAndIsActiveTrue(slug)
            .orElseThrow(() -> {
                log.warn("Product not found or inactive for slug={}", slug);
                return new ResourceNotFoundException("Product not found: " + slug);
            });
        return toDto(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findRelated(String slug) {
        Product current = productRepository.findBySlugAndIsActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));

        if (current.getCategory() == null) {
            return List.of();
        }

        return productRepository.findRelated(current.getCategory(), current.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    private ProductResponseDTO toDto(Product product) {
        List<ProductResponseDTO.ImageDTO> images = product.getImages().stream()
            .sorted(Comparator.comparing(ProductImage::getDisplayOrder))
            .map(img -> new ProductResponseDTO.ImageDTO(img.getImageUrl(), img.getAltText(), img.getIsPrimary()))
            .toList();

        List<ProductResponseDTO.FeatureDTO> features = product.getFeatures().stream()
            .sorted(Comparator.comparing(ProductFeature::getDisplayOrder))
            .map(f -> new ProductResponseDTO.FeatureDTO(f.getFeatureName(), f.getFeatureValue()))
            .toList();

        List<ProductResponseDTO.SpecificationDTO> specs = product.getSpecifications().stream()
            .sorted(Comparator.comparing(ProductSpecification::getDisplayOrder))
            .map(s -> new ProductResponseDTO.SpecificationDTO(s.getSpecificationName(), s.getSpecificationValue()))
            .toList();

        return new ProductResponseDTO(
            product.getId(),
            product.getName(),
            product.getSlug(),
            product.getShortDescription(),
            product.getDescription(),
            product.getPrice(),
            product.getMrp(),
            product.getCategory(),
            product.getIsFeatured(),
            images,
            features,
            specs
        );
    }
}