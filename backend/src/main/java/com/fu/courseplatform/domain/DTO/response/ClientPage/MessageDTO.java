package com.fu.courseplatform.domain.DTO.response.ClientPage;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
    private boolean success;
    private String message;
}
