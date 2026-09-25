INSERT INTO products (name, slug, short_description, description, price, mrp, category, is_featured, is_active) VALUES
                                                                                                                    ('AquaPure RO+', 'aquapure-ro-plus', '7-stage RO purification with alkaline booster', 'The AquaPure RO+ combines reverse osmosis with an alkaline mineral cartridge to deliver clean, mineral-balanced drinking water for a 4-6 member household.', 12999.00, 15999.00, 'RO Purifiers', TRUE, TRUE),
                                                                                                                    ('ZynAqua Copper', 'zynaqua-copper', 'RO + UV with copper-infused mineral cartridge', 'ZynAqua Copper adds a copper-infused mineral cartridge on top of RO+UV purification, delivering the health benefits traditionally associated with water stored in copper vessels.', 15499.00, 18999.00, 'RO Purifiers', TRUE, TRUE),
                                                                                                                    ('AquaPure Mini', 'aquapure-mini', 'Compact RO purifier for small kitchens', 'A compact-footprint RO purifier designed for small kitchens and 1-3 member households, without compromising on purification stages.', 9499.00, 11499.00, 'RO Purifiers', TRUE, TRUE),
                                                                                                                    ('ZynAqua Storage Tank 12L', 'zynaqua-storage-tank-12l', 'Food-grade 12L storage tank for uninterrupted supply', 'A food-grade, BPA-free 12L storage tank that pairs with any ZynAqua purifier to ensure water availability even during power or water-supply interruptions.', 2499.00, NULL, 'Accessories', FALSE, TRUE);

-- Primary images (one per product; multi-image galleries populated via admin, Day 10)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES
                                                                                            (1, '/images/products/aquapure-ro-plus-1.webp', 'AquaPure RO+ water purifier', 0, TRUE),
                                                                                            (2, '/images/products/zynaqua-copper-1.webp', 'ZynAqua Copper water purifier', 0, TRUE),
                                                                                            (3, '/images/products/aquapure-mini-1.webp', 'AquaPure Mini water purifier', 0, TRUE),
                                                                                            (4, '/images/products/storage-tank-12l-1.webp', 'ZynAqua 12L storage tank', 0, TRUE);

-- Feature chips (shown on ProductCard as Badge components)
INSERT INTO product_features (product_id, feature_name, feature_value, display_order) VALUES
                                                                                          (1, 'RO Purification', NULL, 0),
                                                                                          (1, 'Alkaline Booster', NULL, 1),
                                                                                          (2, 'RO + UV', NULL, 0),
                                                                                          (2, 'Copper Infused', NULL, 1),
                                                                                          (3, 'RO Purification', NULL, 0),
                                                                                          (3, 'Compact Design', NULL, 1),
                                                                                          (4, 'BPA-Free', NULL, 0);

-- Specifications (structured spec table, used on product detail page, Day 6)
INSERT INTO product_specifications (product_id, specification_name, specification_value, display_order) VALUES
                                                                                                            (1, 'Purification Stages', '7', 0),
                                                                                                            (1, 'Storage Capacity', '8L', 1),
                                                                                                            (1, 'Suitable For', '4-6 members', 2),
                                                                                                            (2, 'Purification Stages', '8', 0),
                                                                                                            (2, 'Storage Capacity', '10L', 1),
                                                                                                            (2, 'Suitable For', '4-6 members', 2),
                                                                                                            (3, 'Purification Stages', '6', 0),
                                                                                                            (3, 'Storage Capacity', '5L', 1),
                                                                                                            (3, 'Suitable For', '1-3 members', 2);