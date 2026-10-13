package com.inventory;

import com.inventory.product.Product;
import com.inventory.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.List;

@Configuration
public class SampleDataInitializer {
  @Bean
  CommandLineRunner loadSampleProducts(ProductRepository repository) {
    return args -> {
      if (repository.count() > 0) return;
      repository.saveAll(List.of(
        product("Wireless Mouse", "ELE-MOUSE-001", "Electronics", "799.00", 25, 8),
        product("Mechanical Keyboard", "ELE-KEY-002", "Electronics", "2499.00", 12, 5),
        product("A4 Notebook", "STA-NOTE-003", "Stationery", "120.00", 40, 10),
        product("Blue Ball Pen", "STA-PEN-004", "Stationery", "25.00", 7, 15),
        product("Office Chair", "FUR-CHAIR-005", "Furniture", "5499.00", 4, 3),
        product("Water Bottle", "HOM-BOTTLE-006", "Home & Kitchen", "350.00", 18, 6),
        product("USB-C Cable", "ELE-CABLE-007", "Electronics", "299.00", 6, 10),
        product("Desk Lamp", "FUR-LAMP-008", "Furniture", "1299.00", 9, 4)
      ));
    };
  }

  private Product product(String name, String sku, String category, String price, int quantity, int reorderLevel) {
    Product product = new Product();
    product.setName(name); product.setSku(sku); product.setCategory(category);
    product.setPrice(new BigDecimal(price)); product.setQuantity(quantity); product.setReorderLevel(reorderLevel);
    return product;
  }
}
