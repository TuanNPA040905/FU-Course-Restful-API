package com.fu.courseplatform.domain.DTO.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequestDTO {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
        private String email;

    @NotBlank(message = "password không được để trống")
        private String password;

    @NotBlank(message = "Họ tên không được để trống")
        private String fullName;
        private String phone;
        private String address;
        private boolean active;
        private String roleName; // nhận "USER", "MENTOR", "ADMIN"


}
