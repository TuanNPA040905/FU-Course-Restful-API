package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.DTO.request.CreateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.response.CreateUserDTO;
import com.fu.courseplatform.domain.Role;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.RoleRepository;
import com.fu.courseplatform.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    public UserService(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    public boolean checkExistsEmail(String email){
        return this.userRepository.existsByEmail(email);
    }

    public CreateUserDTO handleCreateAUser(CreateUserRequestDTO user) {
        User user1 = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setFullName(user.getFullName());
        user1.setPhone(user.getPhone());
        user1.setAddress(user.getAddress());
        user1.setActive(user.isActive());
        Role role = this.roleService.findByName(user.getRoleName());
        user1.setRole(role);
        User createUser = this.userRepository.save(user1);
        CreateUserDTO createUserDTO = new CreateUserDTO();
        createUserDTO.setId(createUser.getId());
        createUserDTO.setEmail(createUser.getEmail());
        createUserDTO.setAvatar(createUser.getAvatar());
        createUserDTO.setActive(createUser.isActive());
        CreateUserDTO.RoleDTO roleDTO = new CreateUserDTO.RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        createUserDTO.setRole(roleDTO);
        createUserDTO.setPhone(createUser.getPhone());
        createUserDTO.setFullName(createUser.getFullName());
        createUserDTO.setAddress(createUser.getAddress());
        return createUserDTO;
    }
}
