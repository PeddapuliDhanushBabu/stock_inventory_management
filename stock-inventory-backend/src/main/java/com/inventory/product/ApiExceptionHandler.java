package com.inventory.product;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(HttpStatus.BAD_REQUEST)
  Map<String,String> validation(MethodArgumentNotValidException ex) { return Map.of("message", ex.getBindingResult().getFieldErrors().stream().findFirst().map(e -> e.getField() + " " + e.getDefaultMessage()).orElse("Invalid input")); }
  @ExceptionHandler(ResponseStatusException.class)
  ResponseEntity<Map<String,String>> responseStatus(ResponseStatusException ex) { return ResponseEntity.status(ex.getStatusCode()).body(Map.of("message", ex.getReason() == null ? "Request failed" : ex.getReason())); }
}
