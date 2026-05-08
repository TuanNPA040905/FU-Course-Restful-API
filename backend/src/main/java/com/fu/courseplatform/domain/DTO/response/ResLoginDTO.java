package com.fu.courseplatform.domain.DTO.response;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fu.courseplatform.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResLoginDTO {
    @JsonProperty("access_token")
    private String accessToken;
    private UserLogin user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserLogin {
        private long id;
        private String email;
        private String name;
        private RoleDTO role;
        private String avatar;
        private List<String> permissions;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class RoleDTO {
            private long id;
            private String name;

        }
    }

//    public static class UserGetAccount {
//        private UserLogin user;
//
//        public UserLogin getUser() {
//            return user;
//        }
//
//        public void setUser(UserLogin user) {
//            this.user = user;
//        }
//
//        public UserGetAccount() {
//        }
//
//        public UserGetAccount(UserLogin user) {
//            this.user = user;
//        }
//    }
//
//    public static class UserInsideToken {
//        private long id;
//        private String email;
//        private String name;
//
//        public UserInsideToken() {
//        }
//
//        public UserInsideToken(String email, long id, String name) {
//            this.email = email;
//            this.id = id;
//            this.name = name;
//        }
//
//        public long getId() {
//            return id;
//        }
//
//        public void setId(long id) {
//            this.id = id;
//        }
//
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//    }
}
