package com.zynaqua.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_specifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "specification_name", nullable = false, length = 150)
    private String specificationName;

    @Column(name = "specification_value", nullable = false, length = 300)
    private String specificationValue;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;
}