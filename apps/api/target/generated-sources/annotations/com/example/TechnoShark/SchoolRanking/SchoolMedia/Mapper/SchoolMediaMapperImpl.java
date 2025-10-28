package com.example.TechnoShark.SchoolRanking.SchoolMedia.Mapper;

import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaRequest;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaResponse;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Model.SchoolMedia;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:41:26+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.16 (Eclipse Adoptium)"
)
@Component
public class SchoolMediaMapperImpl implements SchoolMediaMapper {

    @Override
    public SchoolMedia toEntity(SchoolMediaRequest school_MediaRequest, School school) {
        if ( school_MediaRequest == null && school == null ) {
            return null;
        }

        SchoolMedia.SchoolMediaBuilder schoolMedia = SchoolMedia.builder();

        if ( school_MediaRequest != null ) {
            schoolMedia.bqaReportLink( school_MediaRequest.getBqaReportLink() );
            schoolMedia.brochureLink( school_MediaRequest.getBrochureLink() );
            schoolMedia.galleryLink( school_MediaRequest.getGalleryLink() );
            schoolMedia.videoTourLink( school_MediaRequest.getVideoTourLink() );
        }
        schoolMedia.school( school );

        return schoolMedia.build();
    }

    @Override
    public SchoolMedia updateEntity(SchoolMediaRequest school_MediaRequest, UUID schoolMediaId, SchoolMedia schoolMedia) {
        if ( school_MediaRequest == null && schoolMediaId == null ) {
            return schoolMedia;
        }

        if ( school_MediaRequest != null ) {
            schoolMedia.setBqaReportLink( school_MediaRequest.getBqaReportLink() );
            schoolMedia.setBrochureLink( school_MediaRequest.getBrochureLink() );
            schoolMedia.setGalleryLink( school_MediaRequest.getGalleryLink() );
            schoolMedia.setVideoTourLink( school_MediaRequest.getVideoTourLink() );
        }
        schoolMedia.setId( schoolMediaId );

        return schoolMedia;
    }

    @Override
    public SchoolMediaResponse toDto(SchoolMedia schoolMedia) {
        if ( schoolMedia == null ) {
            return null;
        }

        String id = null;
        String bqaReportLink = null;
        String brochureLink = null;
        String galleryLink = null;
        String videoTourLink = null;

        if ( schoolMedia.getId() != null ) {
            id = schoolMedia.getId().toString();
        }
        bqaReportLink = schoolMedia.getBqaReportLink();
        brochureLink = schoolMedia.getBrochureLink();
        galleryLink = schoolMedia.getGalleryLink();
        videoTourLink = schoolMedia.getVideoTourLink();

        SchoolMediaResponse schoolMediaResponse = new SchoolMediaResponse( id, bqaReportLink, brochureLink, galleryLink, videoTourLink );

        return schoolMediaResponse;
    }
}
