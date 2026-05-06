package com.fu.courseplatform.controller.client;

import com.fu.courseplatform.domain.DTO.request.LoginDTO;
import com.fu.courseplatform.domain.DTO.response.ResLoginDTO;
import com.fu.courseplatform.domain.Permission;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.PermissionRepository;
import com.fu.courseplatform.service.UserService;
import com.fu.courseplatform.util.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class AuthController {
    private final UserService userService;
    private final PermissionRepository permissionRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil, UserService userService,  PermissionRepository permissionRepository) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
        this.permissionRepository = permissionRepository;
    }

    @Value("${fucourse.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    @PostMapping("/auth/login")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        //Nạp input gồm username/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());

        //Xác thực người dùng => Cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        //create a token
        ResLoginDTO res = new ResLoginDTO();

        User currentUserDB = this.userService.handleGetUserByUsername(loginDTO.getUsername());
        List<String> permissions = permissionRepository.findByRole(currentUserDB.getRole())
                .stream().map(Permission::getName)
                .collect(Collectors.toList()); //CREATE_COURSE", "DELETE_COURSE", "MANAGE_USER

        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
                    userLogin.setId(currentUserDB.getId());
                    userLogin.setEmail(currentUserDB.getEmail());
                    userLogin.setName(currentUserDB.getFullName());
                    ResLoginDTO.UserLogin.RoleDTO roleDTO = new ResLoginDTO.UserLogin.RoleDTO();
                    roleDTO.setId(currentUserDB.getRole().getId());
                    roleDTO.setName(currentUserDB.getRole().getName());
                    userLogin.setRole(roleDTO);
                    userLogin.setPermissions(permissions);
            res.setUser(userLogin);
        }
        //Tạo access Token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), res);
        res.setAccessToken(access_token);
        //set refresh token
        String refresh_token = this.securityUtil.createRefreshToken(authentication.getName(), res);
        this.userService.saveRefreshToken(authentication.getName(), refresh_token);
        // set refreshToken vào cookie (HttpOnly)
        ResponseCookie cookie = ResponseCookie
                .from("refresh_token", refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(res);
    }

    @GetMapping("/refresh")
    public ResponseEntity<ResLoginDTO> refresh(
            @CookieValue(name = "refresh_token") String refreshToken
    ) {
        //1. Validate refresh token
        Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
        String email = decodedToken.getSubject();

        //2. Check token khớp DB ko
        User user = this.userService.handleGetUserByUsername(refreshToken, email);
        if (user == null) {
            throw new RuntimeException("Refresh token không hợp lệ");
        }

        //3. Load permissions mới từ DB
        List<String> permissions = this.permissionRepository
                .findByRole(user.getRole())
                .stream()
                .map(Permission::getName)
                .collect(Collectors.toList());

        //4. Cấp Access Token mới
        ResLoginDTO.UserLogin resLogin = new ResLoginDTO.UserLogin();
        resLogin.setId(user.getId());
        resLogin.setEmail(user.getEmail());
        resLogin.setName(user.getFullName());
        resLogin.setPermissions(permissions);
        ResLoginDTO.UserLogin.RoleDTO role = new ResLoginDTO.UserLogin.RoleDTO();
        role.setId(user.getRole().getId());
        role.setName(user.getRole().getName());
        resLogin.setRole(role);
        ResLoginDTO res = new ResLoginDTO();
        res.setUser(resLogin);
        String newAccessToken = this.securityUtil.createAccessToken(email, res);
        res.setAccessToken(newAccessToken);
        return ResponseEntity.ok().body(res);
    }
}
