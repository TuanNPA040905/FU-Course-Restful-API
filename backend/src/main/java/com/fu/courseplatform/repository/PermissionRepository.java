package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Permission;
import com.fu.courseplatform.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
