package com.jacoblehrman.sketchybusiness;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "app_user")
public class AppUser {
    @Id 
    int id_num;
}
