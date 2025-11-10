import type { SchoolStaff } from '@/types/School2.type';
import { CalendarCheck, CalendarX, Users, UserCheck, UserX } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags';
import { AllCountiresRecord, AllLanguagesRecord } from '@/constants/Countires_Languages_Record';

const StaffCardContent = ({ section }: { section?: SchoolStaff }) => {
  if (!section) return null;

  return (
    <div className="space-y-4">
      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2 items-center">
          <Users className="text-gray-500 w-5 h-5" />
          <div>
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="font-medium">{section.staffSizeEstimate}</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {section.lastInspectionDate ? (
            <>
              <CalendarCheck className="text-green-700 w-5 h-5" />
              <p className="font-medium text-sm">{section.lastInspectionDate}</p>
            </>
          ) : (
            <>
              <CalendarX className="text-gray-400 w-5 h-5" />
              <p className="font-medium text-sm">Not Available</p>
            </>
          )}
        </div>
      </div>

      {/* Leadership */}
      <div>
        <p className="text-sm text-muted-foreground">Leadership Team</p>
        <p className="font-medium text-sm">{section.leadershipTeam}</p>
        {section.leadershipProfileLink && (
          <a
            href={section.leadershipProfileLink}
            className="text-blue-600 hover:underline text-sm"
            target="_blank"
          >
            Profile Link
          </a>
        )}
      </div>

      {/* Teacher Qualifications */}
      <div>
        <p className="text-sm text-muted-foreground">Teacher Qualifications</p>
        <p className="font-medium text-sm">{section.teacherQualifications}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Professional Development</p>
        <p className="font-medium text-sm">{section.professionalDevelopment}</p>
      </div>

      {/* Teacher Nationalities */}
      <div>
        <p className="text-sm text-muted-foreground">Teacher Nationalities</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {section.teacherNationalities.length > 0 ? (
            section.teacherNationalities.map((country, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <CircleFlag countryCode={country.toLowerCase()} className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{AllCountiresRecord[country.toUpperCase()]?.name ?? country}</p>
                </TooltipContent>
              </Tooltip>
            ))
          ) : (
            <p className="text-sm text-gray-500">No Country Provided</p>
          )}
        </div>
      </div>

      {/* Teacher Languages */}
      <div>
        <p className="text-sm text-muted-foreground">Teacher Languages</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {section.teacherLanguages.length > 0 ? (
            section.teacherLanguages.map((language, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <CircleFlagLanguage languageCode={language.toLowerCase()} className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{AllLanguagesRecord[language.toLowerCase()]?.name ?? language}</p>
                </TooltipContent>
              </Tooltip>
            ))
          ) : (
            <p className="text-sm text-gray-500">No Language Provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffCardContent;
