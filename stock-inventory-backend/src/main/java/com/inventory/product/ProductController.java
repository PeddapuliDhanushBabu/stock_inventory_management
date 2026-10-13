package com.inventory.product;

import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
  private final ProductRepository repository;
  public ProductController(ProductRepository repository) { this.repository = repository; }
  @GetMapping public List<Product> all() { return repository.findAll(); }
  @GetMapping("/{id}") public Product one(@PathVariable Long id) { return find(id); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody Product product) { product.setId(null); return repository.save(product); }
  @PutMapping("/{id}") public Product update(@PathVariable Long id, @Valid @RequestBody Product request) {
    Product product = find(id); product.setName(request.getName()); product.setSku(request.getSku()); product.setCategory(request.getCategory()); product.setPrice(request.getPrice()); product.setQuantity(request.getQuantity()); product.setReorderLevel(request.getReorderLevel()); return repository.save(product);
  }
  @PatchMapping("/{id}/stock/in") public Product stockIn(@PathVariable Long id, @Valid @RequestBody StockAdjustment adjustment) { Product p = find(id); p.setQuantity(p.getQuantity() + adjustment.quantity()); return repository.save(p); }
  @PatchMapping("/{id}/stock/out") public Product stockOut(@PathVariable Long id, @Valid @RequestBody StockAdjustment adjustment) { Product p = find(id); if (p.getQuantity() < adjustment.quantity()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock"); p.setQuantity(p.getQuantity() - adjustment.quantity()); return repository.save(p); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { repository.delete(find(id)); }
  private Product find(Long id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found")); }
}
