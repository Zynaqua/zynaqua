package com.zynaqua.auth.service;

import com.zynaqua.admin.entity.Admin;
import com.zynaqua.admin.repository.AdminRepository;
import com.zynaqua.auth.dto.AuthResponseDTO;
import com.zynaqua.auth.dto.LoginRequestDTO;
import com.zynaqua.auth.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponseDTO login(LoginRequestDTO request) {

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException ex) {
            log.warn("Failed login attempt for email={}", request.getEmail());
            throw new BadCredentialsException("Invalid email or password");
        }

        Admin admin = adminRepository.findByEmailAndIsActiveTrue(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("No active admin found"));

        String token = jwtTokenProvider.generateToken(admin.getId(), admin.getEmail());
        log.info("Admin login successful: adminId={}, email={}", admin.getId(), admin.getEmail());

        return new AuthResponseDTO(
            token,
            "Bearer",
            admin.getId(),
            admin.getName(),
            admin.getEmail(),
            jwtTokenProvider.getExpirationMs()
        );
    }
}