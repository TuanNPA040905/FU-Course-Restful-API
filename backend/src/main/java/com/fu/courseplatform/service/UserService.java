package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.DTO.request.CreateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.request.UpdateUserRequestDTO;
import com.fu.courseplatform.domain.DTO.response.CreateUserDTO;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.DTO.response.UserDTO;
import com.fu.courseplatform.domain.Role;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.RoleRepository;
import com.fu.courseplatform.repository.UserRepository;
import com.fu.courseplatform.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final RoleRepository roleRepository;
    public UserService(UserRepository userRepository, RoleService roleService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.roleRepository = roleRepository;
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
        user1.setAvatar(user.getAvatar());
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
        createUserDTO.setAvatar(createUser.getAvatar());
        return createUserDTO;
    }

    public CreateUserDTO handleCreateAccount(CreateUserRequestDTO user) {
        User user1 = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setFullName(user.getFullName());
        user1.setActive(user.isActive());
        user1.setRole(roleService.findByName("USER"));
        User createUser = this.userRepository.save(user1);
        CreateUserDTO cDTO = new CreateUserDTO();

        cDTO.setEmail(createUser.getEmail());
        cDTO.setFullName(createUser.getFullName());
        CreateUserDTO.RoleDTO roleDTO = new CreateUserDTO.RoleDTO();
        roleDTO.setId(createUser.getRole().getId());
        roleDTO.setName(createUser.getRole().getName());
        cDTO.setRole(roleDTO);
        return cDTO;
    }

    public CreateUserDTO handleUpdateUser(Long id, UpdateUserRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        Role role = this.roleRepository.findByName(request.getRoleName());
        user.setRole(role);

        User createUser = this.userRepository.save(user);
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
        return createUserDTO; // reuse method map sang DTO
    }

    public User findById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("User not found"));
    }

    public void deleteById(Long id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("User not found"));
        this.userRepository.deleteById(id);
    }

    public ResultPaginationDTO fetchAllUsers(Specification<User> spec, Pageable pageable) {
        Page<User> pageUsers = this.userRepository.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageUsers.getNumber() + 1);
        mt.setPageSize(pageUsers.getSize());

        mt.setPages(pageUsers.getTotalPages());
        mt.setTotal(pageUsers.getTotalElements());

        rs.setMeta(mt);
        List<UserDTO> listUser = pageUsers.getContent().stream().map(item -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(item.getId());
            userDTO.setEmail(item.getEmail());
            userDTO.setFullName(item.getFullName());
            userDTO.setPhone(item.getPhone());
            userDTO.setAddress(item.getAddress());
            UserDTO.RoleDTO roleDTO = new UserDTO.RoleDTO();
            roleDTO.setId(item.getRole().getId());
            roleDTO.setName(item.getRole().getName());
            userDTO.setRole(roleDTO);
            return userDTO;
        }).collect(Collectors.toList());

        rs.setResult(listUser); // Gán danh sách DTO sạch sẽ vào đây

        return rs;
    }

    public User handleGetUserByUsername(String email) {
        return this.userRepository.findByEmail(email);
    }

    public void saveRefreshToken(String email, String refreshToken) {
        User user = this.userRepository.findByEmail(email);
        if(user != null) {
            user.setRefreshToken(refreshToken);
        }
    }

    public User handleGetUserByUsername(String refreshToken, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(refreshToken,  email);
    }
}
