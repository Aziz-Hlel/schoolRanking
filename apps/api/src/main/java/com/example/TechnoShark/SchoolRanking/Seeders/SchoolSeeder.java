package com.example.TechnoShark.SchoolRanking.Seeders;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.TechnoShark.SchoolRanking.Config.AppConstants;
import com.example.TechnoShark.SchoolRanking.Enums.AccessibilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CountryEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.FacilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LanguageEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.RatingLevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.RoleEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SchoolTypeEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SustainabilityEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.SchoolAcademics;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Repo.SchoolAcademicsRepo;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.Model.SchoolFacilities;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.Repo.SchoolFacilitiesRepo;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFeeItem;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFees;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Repo.SchoolFeesRepo;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Model.SchoolMedia;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Repo.SchoolMediaRepo;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.Model.SchoolStaff;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.Repo.SchoolStaffRepo;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.AverageStudentsPerClassroom;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.ExtracurricularActivity;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.SchoolStudents;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Repo.SchoolStudentsRepo;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import com.example.TechnoShark.SchoolRanking.Schools.Repo.SchoolRepo;
import com.example.TechnoShark.SchoolRanking.UserSchool.Model.UserSchool;
import com.example.TechnoShark.SchoolRanking.UserSchool.Repo.UserSchoolRepo;
import com.example.TechnoShark.SchoolRanking.Users.Model.User;
import com.example.TechnoShark.SchoolRanking.Users.Repo.UserRepo;
import com.example.TechnoShark.SchoolRanking.Utils.CurrentProgressForm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SchoolSeeder {
    private final UserRepo userRepo;
    private final SchoolRepo schoolRepo;
    private final UserSchoolRepo userSchoolRepo;
    private final SchoolAcademicsRepo schoolAcademicsRepo;
    private final SchoolFacilitiesRepo schoolFacilitiesRepo;
    private final SchoolStaffRepo schoolStaffRepo;
    private final SchoolMediaRepo schoolMediaRepo;
    private final SchoolFeesRepo schoolFeesRepo;
    private final SchoolStudentsRepo schoolStudentsRepo;
    private final PasswordEncoder passwordEncoder;

    private final int numberOfSeeds = 10;

    public int getNumberofLanguagesOfInstruction() {
        return ThreadLocalRandom.current().nextInt(1, 10);
    }

    public int getRandomNumber(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max);
    }

    public boolean getRandomBoolean() {
        return ThreadLocalRandom.current().nextBoolean();
    }

    public <E extends Enum<E>> E getRandomEnumValue(Class<E> enumClass) {

        E[] values = enumClass.getEnumConstants();

        return values[ThreadLocalRandom.current().nextInt(values.length)];
    }

    private <E extends Enum<E>> Set<E> getRandomEnumSet(Class<E> enumClass) {

        E[] values = enumClass.getEnumConstants();
        int length = values.length;

        List<E> shuffled = new ArrayList<>(List.of(values));
        Collections.shuffle(shuffled);
        int count = ThreadLocalRandom.current().nextInt(1, length + 1);

        return new HashSet<>(shuffled.subList(0, count));

    }

    private LocalDate getRandomLocalDate(LocalDate startInclusive, LocalDate endExclusive) {
        long startEpochDay = startInclusive.toEpochDay();
        long endEpochDay = endExclusive.toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay);
        return LocalDate.ofEpochDay(randomDay);
    }

    private School createGeneralSchool(int i) {

        School schoolEntity = new School();
        schoolEntity.setName("school" + i);
        schoolEntity.setCountry(getRandomEnumValue(CountryEnums.class));
        schoolEntity.setCity("city" + i);
        schoolEntity.setAddress("adress" + i);
        schoolEntity.setDescription("whatever Nigga");
        schoolEntity.setPhoneNumber("0000000" + i);
        schoolEntity.setEmail("school" + i + "@example.com");
        schoolEntity.setYearEstablished(2000 + i);
        schoolEntity.setType(getRandomEnumValue(SchoolTypeEnums.class));
        schoolEntity.setWebsite("https://school" + i + ".tn");
        schoolEntity.setCampusCountries(null);
        return schoolEntity;
    }

    private SchoolAcademics createAcademics(int i, School school) {
        SchoolAcademics academics = new SchoolAcademics();
        academics.setAccreditationDocsLinks("school" + i + ".com/accreditationDocsLinks");
        academics.setLanguagesOfInstruction(getNumberofLanguagesOfInstruction());
        academics.setCurriculums(getRandomEnumSet(CurriculumEnums.class));
        academics.setInternationalAccreditations(getRandomEnumSet(AccreditationEnums.class));
        academics.setLevelsOffered(getRandomEnumSet(LevelEnums.class));
        academics.setHasGiftedPrograms(getRandomBoolean());
        academics.setHasSpecialNeedsSupport(getRandomBoolean());
        academics.setExtraLanguagesTaught(null);
        academics.setSchool(school); // Set the school reference

        return academics;

    }

    private SchoolFacilities creatSchoolFacilities(int i, School school) {
        SchoolFacilities facilities = new SchoolFacilities();
        facilities.setAccessibilityFeatures(getRandomEnumSet(AccessibilityEnums.class));
        facilities.setFacilities(getRandomEnumSet(FacilityEnums.class));
        facilities.setSustainabilityPractices(getRandomEnumSet(SustainabilityEnums.class));
        facilities.setUniversityDestinations(Set.of("university destination 1", "university destination 2"));
        facilities.setCsrActivities("school" + i + " csr activities");
        facilities.setIndustryPartnerships(Set.of("industry partnership 1", "industry partnership 2"));
        facilities.setSafetyCompliance(getRandomBoolean());
        facilities.setAiIntegration(getRandomBoolean());
        facilities.setTechnologyReadiness(getRandomEnumValue(RatingLevelEnums.class));
        facilities.setAwardsAndRecognitions("school" + i + " awards and recognitions");
        facilities.setHasNurse(getRandomBoolean());
        facilities.setHasPsychologist(getRandomBoolean());
        facilities.setHasNutritionist(getRandomBoolean());
        facilities.setHasTransportationServices(getRandomBoolean());
        facilities.setTransportationPolicies(null);
        facilities.setSchool(school);

        return facilities;

    }

    private SchoolStaff createSchoolStaff(int i, School school) {

        SchoolStaff staff = new SchoolStaff();
        staff.setLeadershipProfileLink("https://school" + i + ".com/LeadershipProfileLink");
        staff.setLeadershipTeam("school" + i + " leadership team");
        staff.setProfessionalDevelopment("school" + i + " professional development");
        staff.setStaffSizeEstimate(getRandomNumber(5, 50));
        staff.setTeacherLanguages(getRandomEnumSet(LanguageEnums.class));
        staff.setTeacherNationalities(getRandomEnumSet(CountryEnums.class).stream().map(Enum::name)
                .collect(java.util.stream.Collectors.toSet()));
        staff.setTeacherQualifications("school" + i + " teacher qualifications");
        staff.setLastInspectionDate(getRandomLocalDate(LocalDate.of(2000, 1, 1), LocalDate.of(2025, 1, 1)));

        staff.setSchool(school);
        school.setSchoolStaff(staff);

        return staff;
    }

    private SchoolMedia creatSchoolMedia(int i, School school) {

        SchoolMedia media = new SchoolMedia();
        media.setBqaReportLink("https://school" + i + ".com/bqaReportLink");
        media.setBrochureLink("https://school\" + i + \".com/BrochureLink");
        media.setGalleryLink("https://school" + i + ".com/GalleryLink");
        media.setVideoTourLink("https://school" + i + ".com/VideoTourLink");

        media.setSchool(school);

        return media;
    }

    private SchoolFeeItem createSchoolFeeItem(int order, String feeTitle) {

        SchoolFeeItem feeItem = new SchoolFeeItem();
        feeItem.setCurrency("USD");
        feeItem.setDescription("fee item description");
        feeItem.setPrice(BigDecimal.valueOf(getRandomNumber(1, 1000)));
        feeItem.setSortOrder(order);
        feeItem.setTitle(feeTitle + " " + order);

        return feeItem;
    }

    private SchoolFees createSchoolFees(int i, School school) {

        SchoolFees fees = new SchoolFees();

        List<SchoolFeeItem> tuitionFees = new ArrayList<>();
        List<SchoolFeeItem> additionalFees = new ArrayList<>();

        for (int j = 1; j <= 5; j++) {
            tuitionFees.add(createSchoolFeeItem(j, "tuition fee " + j));
            additionalFees.add(createSchoolFeeItem(j, "additional fee " + j));
        }

        fees.setTuitionFees(tuitionFees);
        fees.setAdditionalFees(additionalFees);
        fees.setSchool(school);

        return fees;
    }

    private ExtracurricularActivity createExtracurricularActivity(int i) {
        ExtracurricularActivity activity = new ExtracurricularActivity();
        activity.setName("extracurricular activity " + i);
        activity.setDescription("extracurricular activity description " + i);
        activity.setSortOrder(i);
        return activity;
    }

    public AverageStudentsPerClassroom createAverageStudentsPerClassroom(int i) {
        var averageStudentsPerClassroom = new AverageStudentsPerClassroom();
        averageStudentsPerClassroom.setGrade("grade " + i);
        averageStudentsPerClassroom.setNumberOfStudents(getRandomNumber(10, 100));
        averageStudentsPerClassroom.setSortOrder(i);
        return averageStudentsPerClassroom;
    }

    private SchoolStudents createSchoolStudents(int i, School school) {

        SchoolStudents students = new SchoolStudents();
        students.setTotalStudents(getRandomNumber(10, 1000));

        students.setNationalities(getRandomEnumSet(CountryEnums.class).stream().map(Enum::name)
                .collect(java.util.stream.Collectors.toSet()));
        students.setAverageStudentsPerClassroom(null);

        Set<ExtracurricularActivity> extracurricularActivities = new HashSet<>();
        Set<AverageStudentsPerClassroom> averageStudentsPerClassroom = new HashSet<>();

        for (int j = 1; j <= 5; j++) {
            extracurricularActivities.add(createExtracurricularActivity(j));
            averageStudentsPerClassroom.add(createAverageStudentsPerClassroom(j));
        }

        students.setExtracurricularActivities(extracurricularActivities);
        students.setAverageStudentsPerClassroom(averageStudentsPerClassroom);

        students.setSchool(school);

        return students;
    }

    private void createCustomUser() {

        int currentForm = CurrentProgressForm.SCHOOL_STUDENTS;// CurrentProgressForm.SCHOOL_MEDIA;
        int i = 5;

        School school = null;

        School schoolEntity = createGeneralSchool(i);
        schoolEntity.setLastFormStep(currentForm);

        SchoolAcademics academicsEntity = createAcademics(i, schoolEntity);
        schoolAcademicsRepo.save(academicsEntity);

        SchoolFacilities schoolFacilitiesEntity = creatSchoolFacilities(i, schoolEntity);
        schoolFacilitiesRepo.save(schoolFacilitiesEntity);

        school = schoolRepo.save(schoolEntity);

        SchoolStaff schoolStaffEntity = createSchoolStaff(i, school);
        schoolStaffRepo.save(schoolStaffEntity);

        SchoolMedia schoolMediaEntity = creatSchoolMedia(i, school);
        schoolMediaRepo.save(schoolMediaEntity);

        SchoolFees schoolFeesEntity = createSchoolFees(i, school);
        schoolFeesRepo.save(schoolFeesEntity);

        SchoolStudents schoolStudentsEntity = createSchoolStudents(i, school);
        schoolStudentsRepo.save(schoolStudentsEntity);

        User useEntity = User.builder()
                .firstName("Admin")
                .lastName("")
                .email("admin@example.com")
                .password(passwordEncoder.encode("admin"))
                .role(RoleEnums.ADMIN)
                .build();

        userRepo.save(useEntity);

    }

    public void seed() {

        if (schoolRepo.count() != 0)
        return;

        createCustomUser();

        for (int i = 1; i <= numberOfSeeds; i++) {

            // --- 2. Create School ---
            School school = createGeneralSchool(i);

            school.setLastFormStep(AppConstants.FormsTotalSteps);

            // --- 3. Create Academics BEFORE saving school ---
            SchoolAcademics academicsEntity = createAcademics(i, school);
            // schoolAcademicsRepo.save(academicsEntity);
            // Set the relationship on both sides
            school.setSchoolAcademics(academicsEntity);

            // --- 5. Save ONLY the User (it will cascade to save School and Academics) ---

            SchoolFacilities schoolFacilitiesEntity = creatSchoolFacilities(i, school);
            // schoolFacilitiesRepo.save(schoolFacilitiesEntity);
            school.setSchoolFacilities(schoolFacilitiesEntity);

            SchoolMedia mediaEntity = creatSchoolMedia(i, school);

            school.setSchoolMedia(mediaEntity);

            SchoolStaff staffEntity = createSchoolStaff(i, school);
            school.setSchoolStaff(staffEntity);

            school = schoolRepo.save(school);

            // --- 4. Create User ---
            User user = User.builder()
                    .firstName("Admin")
                    .lastName(String.valueOf(i))
                    .email("admin00" + i + "@example.com")
                    .password(passwordEncoder.encode("admin" + i))
                    .role(RoleEnums.ADMIN)
                    .build();

            user = userRepo.save(user);

            log.info("School created with id: {}");
        }

        User user = userRepo.findByEmail("admin@example.com").orElse(null);

        for (int i = 100; i <= 104; i++) {

            // --- 2. Create School ---
            School school = createGeneralSchool(i);

            school.setLastFormStep(AppConstants.FormsTotalSteps);

            // --- 3. Create Academics BEFORE saving school ---
            SchoolAcademics academicsEntity = createAcademics(i, school);
            // schoolAcademicsRepo.save(academicsEntity);
            // Set the relationship on both sides
            school.setSchoolAcademics(academicsEntity);

            // --- 5. Save ONLY the User (it will cascade to save School and Academics) ---

            SchoolFacilities schoolFacilitiesEntity = creatSchoolFacilities(i, school);
            // schoolFacilitiesRepo.save(schoolFacilitiesEntity);
            school.setSchoolFacilities(schoolFacilitiesEntity);

            SchoolMedia mediaEntity = creatSchoolMedia(i, school);

            school.setSchoolMedia(mediaEntity);

            SchoolStaff staffEntity = createSchoolStaff(i, school);
            school.setSchoolStaff(staffEntity);

            SchoolFees feesEntity = createSchoolFees(i, school);
            school.setSchoolFees(feesEntity);

            SchoolStudents studentsEntity = createSchoolStudents(i, school);
            school.setSchoolStudents(studentsEntity);

            school = schoolRepo.save(school);

            UserSchool userSchool = new UserSchool();
            userSchool.setUser(user);
            userSchool.setSchool(school);
            userSchoolRepo.save(userSchool);
            log.info("School created with id: {}");
        }
    }

}
