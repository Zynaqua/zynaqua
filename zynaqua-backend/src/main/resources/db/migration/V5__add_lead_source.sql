ALTER TABLE enquiries
    ADD COLUMN source ENUM('ONLINE', 'OFFLINE') NOT NULL DEFAULT 'ONLINE' AFTER enquiry_type;

CREATE INDEX idx_enquiry_source ON enquiries(source);