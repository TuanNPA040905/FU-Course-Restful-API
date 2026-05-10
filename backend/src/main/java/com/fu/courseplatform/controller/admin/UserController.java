package com.fu.courseplatform.controller.admin;

import com.fu.courseplatform.domain.DTO.request.CreateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.request.UpdateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.response.CreateUserDTO;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.service.CloudinaryService;
import com.fu.courseplatform.service.UserService;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.fu.courseplatform.util.error.EmailAlreadyExistException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, CloudinaryService cloudinaryService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping(value = "/users", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiMessage("Create a user")
    @PreAuthorize("hasAuthority('USER_CREATE')")
    public ResponseEntity<CreateUserDTO> handleCreateUser(
            @RequestPart("data") @Valid CreateUserRequestDTO user,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar) {
        if(this.userService.checkExistsEmail(user.getEmail())){
            throw new EmailAlreadyExistException("Email already exist");
        }
        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        user.setActive(true);
        if(avatar != null && !avatar.isEmpty()) {
            String avatarUrl = this.cloudinaryService.uploadFile(avatar, "avatars");
            user.setAvatar(avatarUrl);
        }
        CreateUserDTO cDTO = this.userService.handleCreateAUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(cDTO);
    }

    @PutMapping("/users/{id}")
    @ApiMessage("Update a user")
    @PreAuthorize("hasAuthority('USER_UPDATE')")
    public ResponseEntity<CreateUserDTO> handleUpdateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequestDTO request) {

        CreateUserDTO updated = this.userService.handleUpdateUser(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/users/{id}")
    @ApiMessage("Get a user by id")
    @PreAuthorize("hasAuthority('USER_GET')")
    public ResponseEntity<User> handleGetUserById(@PathVariable Long id) {
        return ResponseEntity.ok(this.userService.findById(id));
    }

    @DeleteMapping("/users/{id}")
    @ApiMessage("Delete a user by id")
    @PreAuthorize("hasAuthority('USER_DELETE')")
    public ResponseEntity<Void> handleDeleteUserById(@PathVariable Long id) {
        this.userService.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/users")
    @ApiMessage("Get all users")
    @PreAuthorize("hasAuthority('USERS_GET')")
    public ResponseEntity<ResultPaginationDTO> getAllUsers(
            @Filter Specification<User> spec,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.fetchAllUsers(spec, pageable));
    }

}
