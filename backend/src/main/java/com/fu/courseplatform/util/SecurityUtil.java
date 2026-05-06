package com.fu.courseplatform.util;

import com.fu.courseplatform.domain.DTO.response.ResLoginDTO;
import com.fu.courseplatform.domain.Permission;
import com.nimbusds.jose.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SecurityUtil {


    private final JwtEncoder jwtEncoder;
    public SecurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Value("${fucourse.jwt.base64-secret}")
    private String jwtKey;

    @Value("${fucourse.jwt.access-token-validity-in-seconds}")
    private long accessTokenExpiration;

    @Value("${fucourse.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    private final ObjectMapper objectMapper = new ObjectMapper();
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    public String createAccessToken(String email, ResLoginDTO res) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(this.accessTokenExpiration, ChronoUnit.SECONDS);

        List<String> permissions =  res.getUser().getPermissions();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(expiresAt)
//                .claim("user", objectMapper.convertValue(res.getUser(), Map.class))
                .claim("user", res.getUser())
                .claim("permission", permissions)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    //refresh token - lưu vào DB có thể thu hồi
    public String createRefreshToken(String email, ResLoginDTO res) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(this.refreshTokenExpiration, ChronoUnit.SECONDS);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(email)
                .claim("user", res.getUser())
                .build();
        //Refresh token ko cần permission chỉ dùng để xin access token mới
        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(
                JwtEncoderParameters.from(jwsHeader, claims)
        ).getTokenValue();
    }

    //Validate RefreshToken
    public Jwt checkValidRefreshToken(String refreshToken) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey()).macAlgorithm(JWT_ALGORITHM).build();
        try {
            return jwtDecoder.decode(refreshToken);
        } catch (Exception e) {
            throw e;
        }
    }
    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(
                keyBytes, 0, keyBytes.length,
                JWT_ALGORITHM.getName()
        );
    }

    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    }

    private static String extractPrincipal(Authentication authentication) {
        if(authentication == null) return null;
        else if(authentication.getPrincipal() instanceof UserDetails springSecurityUser) {return springSecurityUser.getUsername();}
        else if(authentication.getPrincipal() instanceof Jwt jwt) {return jwt.getSubject();}
        else if(authentication.getPrincipal() instanceof String s) { return s;}
        return null;
    }
}
