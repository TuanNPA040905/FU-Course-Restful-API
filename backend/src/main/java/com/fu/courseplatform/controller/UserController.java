package com.fu.courseplatform.controller;

import com.fu.courseplatform.domain.DTO.request.CreateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.response.CreateUserDTO;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.service.UserService;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.fu.courseplatform.util.error.EmailAlreadyExistException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    @ApiMessage("Create a user")
    public ResponseEntity<CreateUserDTO> handleCreateUser(@Valid @RequestBody CreateUserRequestDTO user) {
        if(this.userService.checkExistsEmail(user.getEmail())){
            throw new EmailAlreadyExistException("Email already exist");
        }
        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        CreateUserDTO cDTO = this.userService.handleCreateAUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(cDTO);
    }
}
