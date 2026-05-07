package com.fu.courseplatform.controller.admin;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.request.CreateCourseDTO;
import com.fu.courseplatform.domain.DTO.request.UpdateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.response.CreateUserDTO;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.service.CloudinaryService;
import com.fu.courseplatform.service.CourseService;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class CourseController {
    private final CourseService courseService;
    private final CloudinaryService cloudinaryService;
    public CourseController(CourseService courseService, CloudinaryService cloudinaryService) {
        this.courseService = courseService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping(value = "/courses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiMessage("Create a course")
    @PreAuthorize("hasAuthority('COURSE_CREATE')")
    public ResponseEntity<Course> handleCreateACourse(
            @RequestPart("data") @Valid CreateCourseDTO course,
            @RequestPart(value = "image", required = false)MultipartFile file) {
        if(file != null && !file.isEmpty()){
            String imageUrl = this.cloudinaryService.uploadFile(file, "images");
            course.setImage(imageUrl);
        }
        Course c = this.courseService.handleCreateCourse(course);
        return ResponseEntity.ok(c);
    }


    @PutMapping("/courses/{id}")
    @ApiMessage("Update a course")
    @PreAuthorize("hasAuthority('COURSE_UPDATE')")
    public ResponseEntity<Course> handleUpdateCourse(
            @PathVariable Long id,
            @RequestPart("data") @Valid CreateCourseDTO course,
            @RequestPart(value = "image", required = false) MultipartFile file) {

        Course c = this.courseService.handleUpdateCourse(id, course);
        return ResponseEntity.ok(c);
    }

    @GetMapping("/courses/{id}")
    @ApiMessage("Get a course by id")
    @PreAuthorize("hasAuthority('COURSE_GET')")
    public ResponseEntity<Course> handleGetCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(this.courseService.findById(id));
    }

    @DeleteMapping("/courses/{id}")
    @ApiMessage("Delete a course by id")
    @PreAuthorize("hasAuthority('COURSE_DELETE')")
    public ResponseEntity<Void> handleDeleteCourseById(@PathVariable Long id) {
        this.courseService.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/courses")
    @ApiMessage("Get all courses")
    @PreAuthorize("hasAuthority('COURSES_GET')")
    public ResponseEntity<ResultPaginationDTO> getAllCourses(
            @Filter Specification<Course> spec,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(this.courseService.fetchAllCourse(spec, pageable));
    }
}
