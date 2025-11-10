package com.jacoblehrman.sketchybusiness.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    AppUserRepo aur;

    public boolean register(String username, String password, String email) {

        AppUser au = new AppUser(username, passwordEncoder.encode(password), email);
        aur.save(au);
        return true;
    }
    
    public void login(String usernameEmail, String password){
        if (usernameEmail == null ) {
            throw new IllegalArgumentException("Username or email cannot be null");
        }
        if(password==null){
            throw new IllegalArgumentException("Password cannot be null");
        }
        AppUser userLog;
        userLog = aur.findByUsername(usernameEmail);
        if(userLog==null){
            userLog = aur.findByEmail(usernameEmail);
        }
        if(userLog==null){
            throw new IllegalArgumentException("Username and password incorrect");
        }
        if(!passwordEncoder.matches(password, userLog.passwordHash)){
            throw new IllegalArgumentException("Username and password incorrect");
        }
    }
}
