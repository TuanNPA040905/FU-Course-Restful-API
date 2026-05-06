package com.fu.courseplatform.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String apiPath;
    private String method;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


}
