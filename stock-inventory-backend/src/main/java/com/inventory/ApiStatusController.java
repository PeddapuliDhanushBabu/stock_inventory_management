package com.inventory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class ApiStatusController {
  @GetMapping("/")
  public Map<String, String> status() {
    return Map.of("status", "running", "message", "Stock Inventory API is running", "health", "/api/health");
  }

  @GetMapping("/api/health")
  public Map<String, String> health() {
    return Map.of("status", "UP");
  }
}
