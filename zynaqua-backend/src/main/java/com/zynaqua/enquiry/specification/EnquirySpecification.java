package com.zynaqua.enquiry.specification;

import com.zynaqua.customer.entity.Customer;
import com.zynaqua.enquiry.entity.Enquiry;
import com.zynaqua.enquiry.entity.EnquiryStatus;
import com.zynaqua.enquiry.entity.EnquiryType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class EnquirySpecification {

    public static Specification<Enquiry> search(String term) {
        if (term == null || term.isBlank()) return null;

        String likeTerm = "%" + term.trim().toLowerCase() + "%";

        return (root, query, cb) -> {
            Join<Enquiry, Customer> customer = root.join("customer", JoinType.LEFT);

            var predicates = cb.or(
                cb.like(cb.lower(customer.get("name")), likeTerm),
                cb.like(customer.get("mobile"), likeTerm),
                cb.like(cb.lower(cb.coalesce(customer.get("email"), "")), likeTerm),
                cb.like(customer.get("pincode"), likeTerm),
                // Allow searching by raw customer ID too, per the roadmap's
                // "Customer ID" search field.
                cb.like(cb.toString(customer.get("id")), likeTerm)
            );
            return predicates;
        };
    }

    public static Specification<Enquiry> hasStatus(EnquiryStatus status) {
        if (status == null) return null;
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Enquiry> hasType(EnquiryType type) {
        if (type == null) return null;
        return (root, query, cb) -> cb.equal(root.get("enquiryType"), type);
    }

    public static Specification<Enquiry> hasCity(String city) {
        if (city == null || city.isBlank()) return null;
        return (root, query, cb) -> {
            Join<Enquiry, Customer> customer = root.join("customer", JoinType.LEFT);
            return cb.equal(cb.lower(customer.get("city")), city.trim().toLowerCase());
        };
    }

    public static Specification<Enquiry> createdBetween(LocalDateTime from, LocalDateTime to) {
        if (from == null && to == null) return null;

        return (root, query, cb) -> {
            if (from != null && to != null) {
                return cb.between(root.get("createdAt"), from, to);
            } else if (from != null) {
                return cb.greaterThanOrEqualTo(root.get("createdAt"), from);
            } else {
                return cb.lessThanOrEqualTo(root.get("createdAt"), to);
            }
        };
    }

    public static Specification<Enquiry> fetchCustomer() {
        return (root, query, cb) -> {
            if (query.getResultType() != Long.class && query.getResultType() != long.class) {
                root.fetch("customer", JoinType.LEFT);
            }
            return cb.conjunction();
        };
    }
}