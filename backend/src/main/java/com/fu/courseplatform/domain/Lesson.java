package com.fu.courseplatform.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;
    private int lessonOrder;
    private int duration;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
