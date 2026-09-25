package com.zynaqua.product.repository;

import com.zynaqua.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByIsActiveTrueAndIsFeaturedTrue();

    Optional<Product> findBySlugAndIsActiveTrue(String slug);

    @Query("""
        SELECT p FROM Product p
        WHERE p.isActive = true
        AND p.category = :category
        AND p.id <> :excludeId
    """)
    List<Product> findRelated(String category, Long excludeId);

    List<Product> findAllByOrderByCreatedAtDesc();

    boolean existsBySlug(String slug);
}