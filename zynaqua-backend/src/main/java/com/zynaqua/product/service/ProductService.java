package com.zynaqua.product.service;

import com.zynaqua.common.exception.ResourceNotFoundException;
import com.zynaqua.product.dto.ProductRequestDTO;
import com.zynaqua.product.dto.ProductResponseDTO;
import com.zynaqua.product.entity.*;
import com.zynaqua.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private static final Pattern NON_SLUG_CHARS = Pattern.compile("[^a-z0-9]+");

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
                product.getIsActive(),
                images,
                features,
                specs
        );
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findAllForAdmin() {

        return productRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        String slug = resolveSlug(request.getSlug(), request.getName(), null);

        Product product = Product.builder()
                .name(request.getName())
                .slug(slug)
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .price(request.getPrice())
                .mrp(request.getMrp())
                .category(request.getCategory())
                .isFeatured(request.isFeatured())
                .isActive(true)
                .build();

        applyChildCollections(product, request);

        Product saved = productRepository.save(product);
        log.info("Product created: id={}, slug={}", saved.getId(), saved.getSlug());
        return toDto(saved);
    }

    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));

        String slug = resolveSlug(request.getSlug(), request.getName(), id);

        product.setName(request.getName());
        product.setSlug(slug);
        product.setShortDescription(request.getShortDescription());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setMrp(request.getMrp());
        product.setCategory(request.getCategory());
        product.setIsFeatured(request.isFeatured());

        product.getImages().clear();
        product.getFeatures().clear();
        product.getSpecifications().clear();
        applyChildCollections(product, request);

        Product saved = productRepository.save(product);
        log.info("Product updated: id={}, slug={}", saved.getId(), saved.getSlug());
        return toDto(saved);
    }

    @Transactional
    public void deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));

        product.setIsActive(false);
        productRepository.save(product);
        log.info("Product deactivated (soft-deleted): id={}", id);
    }

    @Transactional
    public void reactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        product.setIsActive(true);
        productRepository.save(product);
        log.info("Product reactivated: id={}", id);
    }

    private String resolveSlug(String requestedSlug, String name, Long excludeProductId) {
        String slug = (requestedSlug != null && !requestedSlug.isBlank())
                ? slugify(requestedSlug)
                : slugify(name);

        boolean exists = productRepository.existsBySlug(slug);
        if (exists) {
            // On edit, the product's own existing slug is a false positive —
            // only reject if a DIFFERENT product already owns this slug.
            boolean isSameProductsCurrentSlug = excludeProductId != null &&
                    productRepository.findById(excludeProductId)
                            .map(p -> p.getSlug().equals(slug))
                            .orElse(false);

            if (!isSameProductsCurrentSlug) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "A product with slug '" + slug + "' already exists. Choose a different name or slug."
                );
            }
        }
        return slug;
    }

    private String slugify(String input) {
        String lower = input.trim().toLowerCase();
        String slug = NON_SLUG_CHARS.matcher(lower).replaceAll("-");
        return slug.replaceAll("^-+|-+$", "");
    }

    private void applyChildCollections(Product product, ProductRequestDTO request) {
        if (request.getImages() != null) {
            List<ProductImage> images = new ArrayList<>();
            for (var img : request.getImages()) {
                images.add(ProductImage.builder()
                        .product(product)
                        .imageUrl(img.getImageUrl())
                        .altText(img.getAltText())
                        .displayOrder(img.getDisplayOrder())
                        .isPrimary(img.isPrimary())
                        .build());
            }
            product.getImages().addAll(images);
        }

        if (request.getFeatures() != null) {
            List<ProductFeature> features = new ArrayList<>();
            for (var f : request.getFeatures()) {
                features.add(ProductFeature.builder()
                        .product(product)
                        .featureName(f.getFeatureName())
                        .featureValue(f.getFeatureValue())
                        .displayOrder(f.getDisplayOrder())
                        .build());
            }
            product.getFeatures().addAll(features);
        }

        if (request.getSpecifications() != null) {
            List<ProductSpecification> specs = new ArrayList<>();
            for (var s : request.getSpecifications()) {
                specs.add(ProductSpecification.builder()
                        .product(product)
                        .specificationName(s.getSpecificationName())
                        .specificationValue(s.getSpecificationValue())
                        .displayOrder(s.getDisplayOrder())
                        .build());
            }
            product.getSpecifications().addAll(specs);
        }
    }
}