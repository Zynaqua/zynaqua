ALTER TABLE products
    ADD COLUMN model_name VARCHAR(100);

UPDATE products
SET model_name = CASE
                     WHEN slug LIKE '%-model-1' THEN 'Model 1'
                     WHEN slug LIKE '%-model-2' THEN 'Model 2'
                     ELSE NULL
    END;