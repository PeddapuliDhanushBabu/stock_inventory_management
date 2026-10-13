package com.inventory.user;
public record UserResponse(Long id, String name, String email) { static UserResponse from(AppUser user) { return new UserResponse(user.getId(), user.getName(), user.getEmail()); } }
