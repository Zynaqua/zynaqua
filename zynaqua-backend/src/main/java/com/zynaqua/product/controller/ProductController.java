package com.zynaqua.product.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.product.dto.ProductResponseDTO;
import com.zynaqua.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ApiResponse<List<ProductResponseDTO>> getAllProducts() {
        return ApiResponse.success("Products fetched successfully", productService.findAllActive());
    }

    @GetMapping("/featured")
    public ApiResponse<List<ProductResponseDTO>> getFeaturedProducts() {
        return ApiResponse.success("Featured products fetched successfully", productService.findFeatured());
    }

    @GetMapping("/{slug}")
    public ApiResponse<ProductResponseDTO> getProductBySlug(@PathVariable String slug) {
        return ApiResponse.success("Product fetched successfully", productService.findBySlug(slug));
    }
}