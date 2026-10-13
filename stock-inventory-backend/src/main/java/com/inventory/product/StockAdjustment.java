package com.inventory.product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
public record StockAdjustment(@NotNull @Min(1) Integer quantity, String note) {}
