package com.zynaqua.product.controller;

import com.zynaqua.common.response.ApiResponse;
import com.zynaqua.product.dto.ProductRequestDTO;
import com.zynaqua.product.dto.ProductResponseDTO;
import com.zynaqua.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final ProductService productService;

    @GetMapping
    public ApiResponse<List<ProductResponseDTO>> getAllProducts() {
        return ApiResponse.success("Products fetched successfully", productService.findAllForAdmin());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDTO>> createProduct(
        @Valid @RequestBody ProductRequestDTO request
    ) {
        ProductResponseDTO created = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Product created successfully", created));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponseDTO> updateProduct(
        @PathVariable Long id,
        @Valid @RequestBody ProductRequestDTO request
    ) {
        return ApiResponse.success("Product updated successfully", productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deactivateProduct(@PathVariable Long id) {
        productService.deactivateProduct(id);
        return ApiResponse.success("Product deactivated successfully", null);
    }

    @PutMapping("/{id}/reactivate")
    public ApiResponse<Void> reactivateProduct(@PathVariable Long id) {
        productService.reactivateProduct(id);
        return ApiResponse.success("Product reactivated successfully", null);
    }
}