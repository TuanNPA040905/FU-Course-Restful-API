package com.fu.courseplatform.domain.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserClientCreate {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
}
