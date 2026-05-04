package com.fu.courseplatform.domain.DTO.response;

import com.fu.courseplatform.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private RoleDTO role;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoleDTO {
        private long id;
        private String name;
    }

}
