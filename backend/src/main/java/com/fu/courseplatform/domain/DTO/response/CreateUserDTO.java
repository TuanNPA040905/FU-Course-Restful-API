package com.fu.courseplatform.domain.DTO.response;

import com.fu.courseplatform.domain.Role;
import com.fu.courseplatform.util.SecurityUtil;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {
    private long id;
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private String avatar;
    private boolean active;
    private Instant createdAt;
    private String createdBy;
    private RoleDTO role;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.createdAt = Instant.now();
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoleDTO {
        private long id;
        private String name;
    }

}
