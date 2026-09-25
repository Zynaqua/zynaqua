package com.zynaqua.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_features")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "feature_name", nullable = false, length = 150)
    private String featureName;

    @Column(name = "feature_value", length = 300)
    private String featureValue;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;
}