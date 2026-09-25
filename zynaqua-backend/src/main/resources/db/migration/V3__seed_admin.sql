-- src/main/resources/db/migration/V3__seed_admin.sql
-- Local/demo admin account only. Rotate this password immediately in any
-- real deployment — this migration exists purely so Day 8 has a working
-- login without requiring a separate registration flow (V1 has none;
-- admin accounts are provisioned directly in the database, by design —
-- there is no public admin sign-up).

-- password_hash below = BCrypt hash of "ZynAqua@Admin123" (strength 10)
INSERT INTO admins (name, email, password_hash, role, is_active) VALUES
    ('ZynAqua Admin', 'admin@zynaqua.com', '$2a$10$6TABdXFhixvmMDmO.LdOtuBMEih8t9biVEeHf6vzQi.E4v3MGUW9O', 'ADMIN', TRUE);