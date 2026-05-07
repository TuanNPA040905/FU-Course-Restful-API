package com.fu.courseplatform.domain.DTO.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCourseDTO {
    @NotBlank(message = "Title không được để trống")
    private String title;
    @NotBlank(message = "Name không được để trống")
    private String short_name;
    @NotBlank(message = "Description không được để trống")
    private String description;
    private float price;
    private boolean active;
    private int semester;
    private String image;
}
