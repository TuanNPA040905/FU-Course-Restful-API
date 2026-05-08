package com.fu.courseplatform.domain.DTO.response.ClientPage;

import com.fu.courseplatform.domain.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HomeCoursesResponse {
    private List<Course> hotCourse;
    private List<Course> freeCourse;
}
