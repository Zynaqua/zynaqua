package com.zynaqua.auth.service;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LoginRateLimiter {

    private static final int MAX_ATTEMPTS = 5;
    private static final long WINDOW_MS = 15 * 60 * 1000; // 15 minutes

    private final ConcurrentHashMap<String, AttemptRecord> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {
        AttemptRecord record = attempts.get(key);
        if (record == null) return false;

        if (isWindowExpired(record)) {
            attempts.remove(key);
            return false;
        }
        return record.count >= MAX_ATTEMPTS;
    }

    public void recordFailure(String key) {
        attempts.compute(key, (k, existing) -> {
            if (existing == null || isWindowExpired(existing)) {
                return new AttemptRecord(1, Instant.now());
            }
            existing.count++;
            return existing;
        });
    }

    public void recordSuccess(String key) {
        attempts.remove(key);
    }

    public long getRetryAfterSeconds(String key) {
        AttemptRecord record = attempts.get(key);
        if (record == null) return 0;
        long elapsedMs = Instant.now().toEpochMilli() - record.firstAttemptAt.toEpochMilli();
        long remainingMs = WINDOW_MS - elapsedMs;
        return Math.max(0, remainingMs / 1000);
    }

    private boolean isWindowExpired(AttemptRecord record) {
        return Instant.now().toEpochMilli() - record.firstAttemptAt.toEpochMilli() > WINDOW_MS;
    }

    private static class AttemptRecord {
        int count;
        final Instant firstAttemptAt;

        AttemptRecord(int count, Instant firstAttemptAt) {
            this.count = count;
            this.firstAttemptAt = firstAttemptAt;
        }
    }
}