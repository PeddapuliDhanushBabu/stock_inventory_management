package com.inventory.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @NotBlank private String name;
  @Column(unique = true) @NotBlank private String sku;
  private String category;
  @NotNull @DecimalMin("0.0") private BigDecimal price;
  @NotNull @Min(0) private Integer quantity = 0;
  @NotNull @Min(0) private Integer reorderLevel = 5;
  public Long getId() { return id; } public void setId(Long id) { this.id = id; }
  public String getName() { return name; } public void setName(String name) { this.name = name; }
  public String getSku() { return sku; } public void setSku(String sku) { this.sku = sku; }
  public String getCategory() { return category; } public void setCategory(String category) { this.category = category; }
  public BigDecimal getPrice() { return price; } public void setPrice(BigDecimal price) { this.price = price; }
  public Integer getQuantity() { return quantity; } public void setQuantity(Integer quantity) { this.quantity = quantity; }
  public Integer getReorderLevel() { return reorderLevel; } public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }
}
