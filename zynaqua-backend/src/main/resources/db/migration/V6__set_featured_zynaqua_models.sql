UPDATE products
SET is_featured = CASE
    WHEN name = 'Zynaqua Aura' AND model_name = 'Model 1' THEN TRUE
    WHEN name = 'Zynaqua Prime' AND model_name = 'Model 1' THEN TRUE
    WHEN name = 'Zynaqua Premium' AND model_name = 'Model 1' THEN TRUE
    WHEN name IN ('Zynaqua Aura', 'Zynaqua Prime', 'Zynaqua Premium') THEN FALSE
    ELSE is_featured
END
WHERE name IN ('Zynaqua Aura', 'Zynaqua Prime', 'Zynaqua Premium');
