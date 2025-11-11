package com.jacoblehrman.sketchybusiness.appuser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppUserController {

    @Autowired
    private AppUserService aus;

    @PostMapping("/signup")
    public Map<String, String> signUp(@RequestBody SignupRequest sr) {
        boolean status = aus.register(sr.getUserName(), sr.getPassword(), sr.getEmail());
        Map<String, String> response = new HashMap<>();
        if (status == true) {
            response.put("status", "200");
        } else {
            response.put("status", "404");
        }
        return response;

    }
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest lr){
        Map<String, String> response = new HashMap<>();
        try{
            aus.login(lr.getUserNameEmail(),lr.getPassword());
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            response.put("status", "401");
            return response;
        }
        response.put("status", "200");
        return response;
    }

}
