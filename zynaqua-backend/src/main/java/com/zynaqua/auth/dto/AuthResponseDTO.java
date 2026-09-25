package com.zynaqua.auth.dto;

public record AuthResponseDTO(
    String token,
    String tokenType,
    Long adminId,
    String name,
    String email,
    long expiresInMs
) {}