package com.inventory.sale;
import com.inventory.product.Product;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity @Table(name = "sales")
public class Sale {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "product_id") private Product product;
  @Column(nullable = false) private Integer quantity;
  @Column(nullable = false) private BigDecimal unitPrice;
  @Column(nullable = false) private BigDecimal totalAmount;
  private String note;
  @Column(nullable = false, updatable = false) private LocalDateTime soldAt = LocalDateTime.now();
  public Long getId(){return id;} public Product getProduct(){return product;} public void setProduct(Product product){this.product=product;}
  public Integer getQuantity(){return quantity;} public void setQuantity(Integer quantity){this.quantity=quantity;}
  public BigDecimal getUnitPrice(){return unitPrice;} public void setUnitPrice(BigDecimal unitPrice){this.unitPrice=unitPrice;}
  public BigDecimal getTotalAmount(){return totalAmount;} public void setTotalAmount(BigDecimal totalAmount){this.totalAmount=totalAmount;}
  public String getNote(){return note;} public void setNote(String note){this.note=note;} public LocalDateTime getSoldAt(){return soldAt;}
}
