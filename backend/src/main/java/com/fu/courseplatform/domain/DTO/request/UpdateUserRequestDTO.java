package com.fu.courseplatform.domain.DTO.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequestDTO {
    private String fullName;
    private String phone;
    private String address;
    private String roleName;
}
