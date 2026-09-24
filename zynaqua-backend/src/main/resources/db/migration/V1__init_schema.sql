-- V1__init_schema.sql
-- Initial ZynAqua schema: admins, customers, products (+images/features/specs), enquiries.

CREATE TABLE admins (
                        id            BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name          VARCHAR(100) NOT NULL,
                        email         VARCHAR(150) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        role          ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',
                        is_active     BOOLEAN NOT NULL DEFAULT TRUE,
                        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE customers (
                           id         BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name       VARCHAR(100) NOT NULL,
                           mobile     VARCHAR(15)  NOT NULL,
                           email      VARCHAR(150) NULL,
                           city       VARCHAR(100) NOT NULL,
                           pincode    VARCHAR(6)   NOT NULL,
                           address    TEXT NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
                          id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name               VARCHAR(150) NOT NULL,
                          slug               VARCHAR(180) NOT NULL UNIQUE,
                          short_description  VARCHAR(300) NULL,
                          description        TEXT NULL,
                          price              DECIMAL(10,2) NOT NULL,
                          mrp                DECIMAL(10,2) NULL,
                          category           VARCHAR(100) NULL,
                          is_featured        BOOLEAN NOT NULL DEFAULT FALSE,
                          is_active          BOOLEAN NOT NULL DEFAULT TRUE,
                          created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_images (
                                id            BIGINT AUTO_INCREMENT PRIMARY KEY,
                                product_id    BIGINT NOT NULL,
                                image_url     VARCHAR(500) NOT NULL,
                                alt_text      VARCHAR(200) NULL,
                                display_order INT NOT NULL DEFAULT 0,
                                is_primary    BOOLEAN NOT NULL DEFAULT FALSE,
                                CONSTRAINT fk_product_images_product
                                    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_features (
                                  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  product_id    BIGINT NOT NULL,
                                  feature_name  VARCHAR(150) NOT NULL,
                                  feature_value VARCHAR(300) NULL,
                                  display_order INT NOT NULL DEFAULT 0,
                                  CONSTRAINT fk_product_features_product
                                      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_specifications (
                                        id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
                                        product_id            BIGINT NOT NULL,
                                        specification_name    VARCHAR(150) NOT NULL,
                                        specification_value   VARCHAR(300) NOT NULL,
                                        display_order         INT NOT NULL DEFAULT 0,
                                        CONSTRAINT fk_product_specs_product
                                            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE enquiries (
                           id            BIGINT AUTO_INCREMENT PRIMARY KEY,
                           customer_id   BIGINT NOT NULL,
                           enquiry_type  ENUM('FREE_DEMO','PRODUCT_ENQUIRY','AMC','SERVICE','GENERAL') NOT NULL,
                           product_id    BIGINT NULL,
                           message       TEXT NULL,
                           status        ENUM('NEW','CONTACTED','FOLLOW_UP','DEMO_SCHEDULED','DEMO_COMPLETED',
                        'CONVERTED','NOT_INTERESTED','CANCELLED') NOT NULL DEFAULT 'NEW',
                           created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           CONSTRAINT fk_enquiries_customer
                               FOREIGN KEY (customer_id) REFERENCES customers(id),
                           CONSTRAINT fk_enquiries_product
                               FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_customer_mobile  ON customers(mobile);
CREATE INDEX idx_customer_city    ON customers(city);
CREATE INDEX idx_enquiry_status   ON enquiries(status);
CREATE INDEX idx_enquiry_type     ON enquiries(enquiry_type);
CREATE INDEX idx_enquiry_customer ON enquiries(customer_id);
CREATE INDEX idx_enquiry_created  ON enquiries(created_at);
CREATE INDEX idx_product_slug     ON products(slug);
CREATE INDEX idx_product_featured ON products(is_featured);
CREATE INDEX idx_product_category ON products(category);