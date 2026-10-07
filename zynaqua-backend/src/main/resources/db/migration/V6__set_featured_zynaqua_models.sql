UPDATE products
SET is_featured = CASE
                      WHEN slug IN (
                                    'zynaqua-aura-model-1',
                                    'zynaqua-prime-model-1',
                                    'zynaqua-premium-model-1'
                          ) THEN TRUE
                      ELSE FALSE
    END
WHERE slug IN (
               'zynaqua-aura-model-1',
               'zynaqua-aura-model-2',
               'zynaqua-prime-model-1',
               'zynaqua-prime-model-2',
               'zynaqua-premium-model-1',
               'zynaqua-premium-model-2'
    );