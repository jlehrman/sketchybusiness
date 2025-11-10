package com.jacoblehrman.sketchybusiness.appuser;
import lombok.Data;

@Data
public class LoginRequest {
    private String userNameEmail;
    private String password;
}