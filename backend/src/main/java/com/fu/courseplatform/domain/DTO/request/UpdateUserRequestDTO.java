package com.fu.courseplatform.domain.DTO.request;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {
    private String fullName;
    private String phone;
    private String address;
    private String roleName;
}
