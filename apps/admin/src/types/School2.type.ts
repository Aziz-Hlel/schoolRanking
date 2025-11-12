import { CountryEnums } from '@/enums/CountryEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';
import { FacilityEnums } from '@/enums/FacilityEnums';
import { LanguageEnums } from '@/enums/LanguagesEnums';
import { SchoolTypeEnums } from '@/enums/SchoolTypeEnums';
import { AccessibilityEnums } from '@/enums/AccessibilityEnums';
import { SustainabilityEnums } from '@/enums/SustainabilityEnums';
import { AccreditationEnums } from '@/enums/AccreditationEnums';
import { LevelEnums } from '@/enums/LevelEnums';
import z from 'zod';
import { RatingLevelEnums } from '@/enums/RatingLevelEnums';

// Schemas

export const schoolGeneralSchema = z.object({
  name: z
    .string()
    .min(2, 'School name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(5, 'Description must be at least 10 characters')
    .max(1000, 'Description must be at most 1000 characters')
    .trim(),
  country: z.enum(
    Object.values(CountryEnums).map((country) => country.value) as [string, ...string[]],
  ),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters')
    .trim(),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be at most 100 characters')
    .trim(),
  phoneNumber: z
    .string()
    .min(8, 'Phone number must be at least 8 characters')
    .max(20, 'Phone number must be at most 20 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .max(100, 'Email must be at most 100 characters'),
  yearEstablished: z
    .number()
    .int('Year must be a whole number')
    .min(1800, 'Year must be after 1800')
    .max(2025, 'Year cannot be in the future'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .max(100, 'Website must be at most 100 characters')
    .trim()
    .optional(),
  type: z.enum(Object.values(SchoolTypeEnums).map((type) => type.value) as [string, ...string[]]),
  campusCountries: z.array(z.string()).default([]),
});

export const schoolAcademicsSchema = z.object({
  languagesOfInstruction: z
    .number()
    .int('Number of languages must be a whole number')
    .min(1, 'At least one language is required')
    .max(20, 'Maximum 20 languages allowed'),

  internationalAccreditations: z
    .array(z.enum(Object.keys(AccreditationEnums) as [string, ...string[]]))
    .min(1, 'At least one accreditation is required'),

  additionalAccreditations: z
    .array(
      z
        .string()
        .min(2, 'Accreditation must be at least 2 characters')
        .max(50, 'Accreditation must be at most 50 characters')
        .trim(),
    )
    .default([]),

  accreditationDocsLinks: z
    .string()
    .max(100, 'Link must be at most 100 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),

  levelsOffered: z
    .array(z.enum(Object.keys(LevelEnums) as [string, ...string[]]))
    .min(1, 'At least one level is required'),

  curriculums: z
    .array(z.enum(Object.keys(CurriculumEnums) as [string, ...string[]]))
    .min(1, 'At least one curriculum is required'),

  additionalCurriculums: z
    .array(
      z
        .string()
        .min(2, 'Curriculum must be at least 2 characters')
        .max(50, 'Curriculum must be at most 50 characters')
        .trim(),
    )
    .max(50, 'Maximum 50 curriculums allowed')
    .default([]),

  extraLanguagesTaught: z
    .array(
      z
        .string()
        .max(50, 'Language must be at most 50 characters')
        .trim()
        .transform((val) => (val?.length !== 0 ? val : undefined)),
    )
    .max(50, 'Maximum 50 languages allowed')
    .default([]),

  hasGiftedPrograms: z.boolean({ required_error: 'Gifted programs is required' }).default(false),

  hasSpecialNeedsSupport: z
    .boolean({ required_error: 'Special needs support is required' })
    .default(false),

  innovativeTeachingMethods: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Title is required' })
          .min(2, 'Title must be at least 2 characters')
          .max(50, 'Title must be at most 50 characters')
          .trim(),
        description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
      }),
    )
    .max(50, 'Maximum 50 innovative teaching methods allowed')
    .default([]),
});

export const schoolFacilitiesSchema = z.object({
  facilities: z.array(z.enum(Object.keys(FacilityEnums) as [string, ...string[]])).default([]),

  accessibilityFeatures: z
    .array(z.enum(Object.keys(AccessibilityEnums) as [string, ...string[]]))
    .default([]),

  sustainabilityPractices: z
    .array(z.enum(Object.keys(SustainabilityEnums) as [string, ...string[]]))
    .default([]),

  universityDestinations: z
    .array(
      z
        .string()
        .min(2, 'University name must be at least 2 characters')
        .max(50, 'University name must be at most 50 characters')
        .trim(),
    )
    .min(1, 'At least one university destination is required')
    .max(50, 'Maximum 50 university destinations allowed')
    .default([]),

  csrActivities: z
    .string()
    .min(10, 'CSR activities description must be at least 10 characters')
    .max(1000, 'Description must be at most 1000 characters')
    .trim(),

  hasNurse: z.boolean({ required_error: 'Nurse is required' }).default(false),

  hasPsychologist: z.boolean({ required_error: 'Psychologist is required' }).default(false),

  hasFoodService: z.boolean({ required_error: 'Food service is required' }).default(false),

  hasNutritionist: z.boolean({ required_error: 'Nutritionist is required' }).default(false),

  safetyCompliance: z.boolean({ required_error: 'Safety compliance is required' }).default(false),

  aiIntegration: z.boolean({ required_error: 'AI integration is required' }),

  aiIntegrationDescription: z
    .string()
    .max(1000, 'Description must be at most 1000 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),

  hasTransportationServices: z
    .boolean({ required_error: 'Transportation services is required' })
    .default(false),

  transportationPolicies: z
    .union([
      z.string().min(1).max(1000, 'Description must be at most 1000 characters').trim(),
      z.literal(''),
    ])
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
  technologyReadiness: z.enum(Object.keys(RatingLevelEnums) as [string, ...string[]]),

  industryPartnerships: z
    .array(
      z
        .string()
        .min(2, 'Partnership name must be at least 2 characters')
        .max(50, 'Partnership name must be at most 50 characters')
        .trim(),
    )
    .max(50, 'Maximum 50 industry partnerships allowed')
    .default([]),

  awardsAndRecognitions: z.string().max(255).trim().optional(),
});

export const schoolStaffSchema = z.object({
  leadershipTeam: z
    .string()
    .min(10, 'Leadership team description must be at least 10 characters')
    .max(255, 'Description must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),

  leadershipProfileLink: z
    .string()
    .url('Please enter a valid URL for leadership profile')
    .max(255, 'URL must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),

  staffSizeEstimate: z
    .number({ required_error: 'Staff size is required' })
    .int('Staff size must be a whole number')
    .min(1, 'Staff size must be at least 1')
    .max(1000, 'Staff size must be at most 1000'),

  teacherQualifications: z
    .string({ required_error: 'Teacher qualifications are required' })
    .min(10, 'Teacher qualifications must be at least 10 characters'),

  teacherNationalities: z
    .array(z.string(), { required_error: 'At least one teacher nationality is required' })
    .min(1, 'At least one teacher nationality is required'),

  teacherLanguages: z
    .array(
      z.enum(
        Object.values(LanguageEnums).map((language) => language.value) as [string, ...string[]],
      ),
      { required_error: 'At least one teacher language is required' },
    )
    .min(1, 'At least one teacher language is required'),

  professionalDevelopment: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),

  lastInspectionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-MM-dd format')
    .refine((date) => new Date(date) <= new Date(), 'Inspection date must be in the past')
    .optional(),
});

export const schoolMediaSchema = z.object({
  bqaReportLink: z
    .string()
    .url('Please enter a valid URL')
    .max(255, 'URL must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
  brochureLink: z
    .string()
    .url('Please enter a valid URL')
    .max(255, 'URL must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
  galleryLink: z
    .string()
    .url('Please enter a valid URL')
    .max(255, 'URL must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
  videoTourLink: z
    .string()
    .url('Please enter a valid URL')
    .max(255, 'URL must be at most 255 characters')
    .trim()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
});

export const schoolFeesSchema = z.object({
  tuitionFees: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Fee title is required' })
          .min(1, 'Fee title is required'),
        price: z.number().positive('Price must be a positive number'),
        description: z.string().min(10, 'Description must be at least 10 characters'),
        currency: z.string().min(3, 'Currency must be at least 3 characters'),
        sortOrder: z
          .number()
          .int('Sort order must be a number')
          .min(0, 'Sort order must be at least 0'),
      }),
    )
    .default([]),
  additionalFees: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Fee title is required' })
          .min(1, 'Fee title is required'),
        price: z.number().positive('Price must be a positive number'),
        description: z.string().min(10, 'Description must be at least 10 characters'),
        currency: z.string().min(3, 'Currency must be at least 3 characters'),
        sortOrder: z
          .number()
          .int('Sort order must be a number')
          .min(0, 'Sort order must be at least 0'),
      }),
    )
    .default([]),
});

export const schoolStudentsSchema = z.object({
  totalStudents: z
    .number()
    .int('Total students must be a whole number')
    .positive('Total students must be a positive number')
    .max(100000, 'Total students must be less than 100,000')
    .optional()
    .transform((val) => (val === undefined ? undefined : Number(val))),
  hasParentsCommittee: z
    .boolean({ required_error: 'Parents committee is required' })
    .default(false),
  nationalities: z.array(z.string()).default([]),
  extracurricularActivities: z
    .array(
      z.object({
        name: z
          .string({ required_error: 'Activity name is required' })
          .min(2, 'Activity name must be at least 2 characters')
          .max(100, 'Activity name must be at most 100 characters')
          .trim(),
        description: z
          .string({ required_error: 'Description is required' })
          .min(10, 'Description must be at least 10 characters')
          .max(1000, 'Description must be at most 1000 characters')
          .trim(),
        sortOrder: z
          .number()
          .int('Sort order must be a number')
          .min(0, 'Sort order must be at least 0')
          .max(1000, 'Sort order must be at most 1000'), // ! questionable let s hope your logic doesnt generate a negative number,
      }),
    )
    .default([]),
  averageStudentsPerClassroom: z
    .array(
      z.object({
        grade: z.string().min(1, 'Grade name is required'),
        numberOfStudents: z
          .number({ required_error: 'Number of students is required' })
          .int('Number of students must be a whole number')
          .positive('Number of students must be a positive number')
          .max(1000, 'Number of students must be less than 1.000'),
        sortOrder: z
          .number()
          .int('Sort order must be a number')
          .min(0, 'Sort order must be at least 0') // ! questionable let s hope your logic doesnt generate a negative number,
          .max(1000, 'Sort order must be at most 1000'),
      }),
    )
    .default([]),
});

type Id = {
  id: string;
};

type SchoolGeneralNoID = z.infer<typeof schoolGeneralSchema>;

export type SchoolGeneral = SchoolGeneralNoID & Id;

export type SchoolAcademicsNoID = z.infer<typeof schoolAcademicsSchema>;

export type SchoolAcademics = SchoolAcademicsNoID & Id;

type SchoolFacilitiesNoID = z.infer<typeof schoolFacilitiesSchema>;

export type SchoolFacilities = SchoolFacilitiesNoID & Id;

type SchoolStaffNoID = z.infer<typeof schoolStaffSchema>;

export type SchoolStaff = SchoolStaffNoID & Id;

type SchoolMediaNoID = z.infer<typeof schoolMediaSchema>;

export type SchoolMedia = SchoolMediaNoID & Id;

export type SchoolFeesNoID = z.infer<typeof schoolFeesSchema>;

export type SchoolFees = SchoolFeesNoID & Id;

export type SchoolStudentsNoID = z.infer<typeof schoolStudentsSchema>;

export type SchoolStudents = SchoolStudentsNoID & Id;

export type SchoolDetailed = {
  schoolGeneral?: SchoolGeneral;
  schoolAcademics?: SchoolAcademics;
  schoolFacilities?: SchoolFacilities;
  schoolStaff?: SchoolStaff;
  schoolMedia?: SchoolMedia;
  schoolFees?: SchoolFees;
  schoolStudents?: SchoolStudents;
};
