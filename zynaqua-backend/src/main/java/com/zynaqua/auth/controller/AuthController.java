package com.zynaqua.auth.controller;

import com.zynaqua.auth.dto.AuthResponseDTO;
import com.zynaqua.auth.dto.LoginRequestDTO;
import com.zynaqua.auth.service.AuthService;
import com.zynaqua.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ApiResponse.success("Login successful", response);
    }
}