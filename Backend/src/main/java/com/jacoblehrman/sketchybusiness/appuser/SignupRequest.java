package com.jacoblehrman.sketchybusiness.appuser;
import lombok.Data;

@Data
public class SignupRequest {
    private String userName;
    private String password;
    private String email;
}
