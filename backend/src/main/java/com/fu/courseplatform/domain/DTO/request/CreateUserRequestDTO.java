package com.fu.courseplatform.domain.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequestDTO {
        private String email;
        private String password;
        private String fullName;
        private String phone;
        private String address;
        private boolean active;
        private String roleName; // nhận "USER", "MENTOR", "ADMIN"

}
