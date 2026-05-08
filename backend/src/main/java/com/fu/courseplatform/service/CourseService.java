package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.request.CreateCourseDTO;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.DTO.response.UserDTO;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.CourseRepository;
import com.fu.courseplatform.util.error.IdInvalidException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course handleCreateCourse(CreateCourseDTO createCourseDTO) {
        Course c = new Course();
        c.setTitle(createCourseDTO.getTitle());
        c.setDescription(createCourseDTO.getDescription());
        c.setPrice(createCourseDTO.getPrice());
        c.setImage(createCourseDTO.getImage());
        c.setSemester(createCourseDTO.getSemester());
        c.setActive(createCourseDTO.isActive());
        c.setShortName(createCourseDTO.getShortName());
        return this.courseRepository.save(c);
    }

    public Course findById(long id) {
        return this.courseRepository.findById(id).orElse(null);
    }

    public void deleteById(long id) {
        this.courseRepository.deleteById(id);
    }

    public Course handleUpdateCourse(long id, CreateCourseDTO createCourseDTO) {
        Course c = this.courseRepository.findById(id).orElse(null);
        if(c == null){
            throw new IdInvalidException("Not found course with id: " + id);
        }
        c.setTitle(createCourseDTO.getTitle());
        c.setDescription(createCourseDTO.getDescription());
        c.setPrice(createCourseDTO.getPrice());
        c.setImage(createCourseDTO.getImage());
        c.setShortName(createCourseDTO.getShortName());
        c.setSemester(createCourseDTO.getSemester());
        c.setActive(createCourseDTO.isActive());
        return this.courseRepository.save(c);
    }

    public ResultPaginationDTO fetchAllCourse(Specification<Course> spec, Pageable pageable) {
        Page<Course> pageCourses = this.courseRepository.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageCourses.getNumber() + 1);
        mt.setPageSize(pageCourses.getSize());

        mt.setPages(pageCourses.getTotalPages());
        mt.setTotal(pageCourses.getTotalElements());

        rs.setMeta(mt);
        List<Course> listCourse = pageCourses.getContent().stream().map(item -> {
            Course c = new Course();
            c.setId(item.getId());
            c.setTitle(item.getTitle());
            c.setDescription(item.getDescription());
            c.setPrice(item.getPrice());
            c.setImage(item.getImage());
            c.setSemester(item.getSemester());
            c.setActive(item.isActive());
            c.setShortName(item.getShortName());
            c.setCreatedAt(item.getCreatedAt());
            c.setUpdatedAt(item.getUpdatedAt());
            c.setCreatedBy(item.getCreatedBy());
            c.setUpdatedBy(item.getUpdatedBy());
            return c;
        }).collect(Collectors.toList());

        rs.setResult(listCourse); // Gán danh sách DTO sạch sẽ vào đây

        return rs;
    }

    public List<Course> findHotCourses(int limit) {
        return this.courseRepository.findHotCourses(PageRequest.of(0, limit));
    }

    public List<Course> findFreeCourses(int limit) {
        return this.courseRepository.findFreeCourses(PageRequest.of(0, limit));
    }
}
