package com.zynaqua.common.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ValidationErrorResponse(
    boolean success,
    String message,
    Map<String, String> fieldErrors,
    LocalDateTime timestamp
) {}