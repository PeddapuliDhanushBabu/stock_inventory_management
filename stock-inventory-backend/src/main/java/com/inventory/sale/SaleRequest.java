package com.inventory.sale;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
public record SaleRequest(@NotNull Long productId, @NotNull @Min(1) Integer quantity, String note) {}
