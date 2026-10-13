package com.inventory.sale;
import com.inventory.product.Product;
import com.inventory.product.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@RestController @RequestMapping("/api/sales")
public class SaleController {
  private final SaleRepository sales; private final ProductRepository products;
  public SaleController(SaleRepository sales, ProductRepository products){this.sales=sales;this.products=products;}
  @GetMapping public List<SaleView> all(){return sales.findAllByOrderBySoldAtDesc().stream().map(SaleView::from).toList();}
  @PostMapping @ResponseStatus(HttpStatus.CREATED) @Transactional public SaleView create(@Valid @RequestBody SaleRequest request){Product product=products.findById(request.productId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found"));if(product.getQuantity()<request.quantity())throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Insufficient stock for this sale");product.setQuantity(product.getQuantity()-request.quantity());products.save(product);Sale sale=new Sale();sale.setProduct(product);sale.setQuantity(request.quantity());sale.setUnitPrice(product.getPrice());sale.setTotalAmount(product.getPrice().multiply(BigDecimal.valueOf(request.quantity())));sale.setNote(request.note());return SaleView.from(sales.save(sale));}
  public record SaleView(Long id,Long productId,String productName,Integer quantity,BigDecimal unitPrice,BigDecimal totalAmount,String note,LocalDateTime soldAt){static SaleView from(Sale sale){return new SaleView(sale.getId(),sale.getProduct().getId(),sale.getProduct().getName(),sale.getQuantity(),sale.getUnitPrice(),sale.getTotalAmount(),sale.getNote(),sale.getSoldAt());}}
}
