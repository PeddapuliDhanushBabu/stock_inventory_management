package com.inventory.user;

import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users; private final PasswordEncoder passwordEncoder;
  public AuthController(UserRepository users, PasswordEncoder passwordEncoder) { this.users = users; this.passwordEncoder = passwordEncoder; }
  @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED)
  public UserResponse register(@Valid @RequestBody RegisterRequest request) {
    if (users.existsByEmail(request.email().toLowerCase().trim())) throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
    AppUser user = new AppUser(); user.setName(request.name().trim()); user.setEmail(request.email()); user.setPassword(passwordEncoder.encode(request.password())); return UserResponse.from(users.save(user));
  }
  @PostMapping("/login")
  public UserResponse login(@Valid @RequestBody LoginRequest request) {
    AppUser user = users.findByEmail(request.email().toLowerCase().trim()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect email or password"));
    if (!passwordEncoder.matches(request.password(), user.getPassword())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect email or password");
    return UserResponse.from(user);
  }
}
