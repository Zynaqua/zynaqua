package com.zynaqua.auth.service;

import com.zynaqua.admin.entity.Admin;
import com.zynaqua.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomAdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmailAndIsActiveTrue(email)
            .orElseThrow(() -> new UsernameNotFoundException("No active admin found for email: " + email));

        return new User(
            admin.getEmail(),
            admin.getPasswordHash(),
            List.of(new SimpleGrantedAuthority("ROLE_" + admin.getRole().name()))
        );
    }
}