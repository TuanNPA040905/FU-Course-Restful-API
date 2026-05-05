package com.fu.courseplatform.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.InstantSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String password;
    private String phone;
    private String fullName;
    private boolean active;
    private String avatar;
    private String address;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String refreshToken;
    @JsonSerialize(using = InstantSerializer.class)
    private Instant createdAt;
    @JsonSerialize(using = InstantSerializer.class)
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

//    @PrePersist
//    public void handleBeforeCreate() {
//        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent()
//                ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//        this.createdAt = Instant.now();
//    }
//
//    @PreUpdate
//    public void handleBeforeUpdate() {
//        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent()
//                ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//
//        this.updatedAt = Instant.now();
//    }
}
