package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Role;
import com.fu.courseplatform.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findByName(String roleName){
        return this.roleRepository.findByName(roleName);
    }
}
