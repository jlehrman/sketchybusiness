package com.jacoblehrman.sketchybusiness.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Integer> {
    AppUser findByUsername(String username);
    AppUser findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
