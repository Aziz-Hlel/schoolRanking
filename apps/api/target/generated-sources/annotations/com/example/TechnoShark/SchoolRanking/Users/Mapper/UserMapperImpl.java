package com.example.TechnoShark.SchoolRanking.Users.Mapper;

import com.example.TechnoShark.SchoolRanking.Enums.RoleEnums;
import com.example.TechnoShark.SchoolRanking.Users.DTO.UpdateUserRequest;
import com.example.TechnoShark.SchoolRanking.Users.DTO.UserPageResponse;
import com.example.TechnoShark.SchoolRanking.Users.DTO.UserResponse;
import com.example.TechnoShark.SchoolRanking.Users.Model.User;
import java.sql.Date;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:41:26+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.16 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toDto(User Entity) {
        if ( Entity == null ) {
            return null;
        }

        UUID id = null;
        String firstName = null;
        String lastName = null;
        RoleEnums role = null;
        String email = null;

        id = Entity.getId();
        firstName = Entity.getFirstName();
        lastName = Entity.getLastName();
        role = Entity.getRole();
        email = Entity.getEmail();

        UserResponse userResponse = new UserResponse( id, firstName, lastName, role, email );

        return userResponse;
    }

    @Override
    public User toUpdatedEntity(UpdateUserRequest userRequest, User Entity) {
        if ( userRequest == null ) {
            return Entity;
        }

        Entity.setFirstName( userRequest.getFirstName() );
        Entity.setLastName( userRequest.getLastName() );
        Entity.setEmail( userRequest.getEmail() );

        return Entity;
    }

    @Override
    public UserPageResponse toPageDto(User Entity) {
        if ( Entity == null ) {
            return null;
        }

        UUID id = null;
        String firstName = null;
        String lastName = null;
        RoleEnums role = null;
        String email = null;
        Date createdAt = null;

        id = Entity.getId();
        firstName = Entity.getFirstName();
        lastName = Entity.getLastName();
        role = Entity.getRole();
        email = Entity.getEmail();
        if ( Entity.getCreatedAt() != null ) {
            createdAt = new Date( Entity.getCreatedAt().getTime() );
        }

        String username = firstName + " " + lastName;

        UserPageResponse userPageResponse = new UserPageResponse( id, username, firstName, lastName, role, email, createdAt );

        return userPageResponse;
    }
}
