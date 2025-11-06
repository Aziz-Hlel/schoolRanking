import type { SchoolStaff } from '@/types/School2.type';
import { CalendarCheck, CalendarX } from 'lucide-react';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags';
import { AllCountiresRecord, AllLanguagesRecord } from '@/constants/Countires_Languages_Record';

const StaffCardContent = ({ section }: { section?: SchoolStaff }) => {
  if (!section) return null;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Staff</p>
          <p className="font-medium">{section.staffSizeEstimate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last inspection date</p>
          {section.lastInspectionDate ? (
            <div className="flex items-center gap-2 ">
              <CalendarCheck className=" w-4 h-4 text-green-600" />
              <p className="font-medium text-xs lg:text-sm ">{section.lastInspectionDate}</p>
            </div>
          ) : (
            <CalendarX className=" w-4 h-4" />
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Leadership Team</p>
        <p className="font-medium text-xs lg:text-sm">{section.leadershipTeam}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Leadership profile Link</p>
        <a href={section.leadershipProfileLink} className="text-sm text-blue-600 hover:underline">
          {section.leadershipProfileLink}
        </a>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Teacher Qualifications</p>
        <p className="font-medium text-xs lg:text-sm">{section.teacherQualifications}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Professional development</p>
        <p className="font-medium text-xs lg:text-sm">{section.professionalDevelopment}</p>
      </div>
      <div className=" flex space-x-4 items-center">
        <Label className="text-sm text-muted-foreground w-fit">Teacher Nationalities</Label>

        <div className=" flex space-x-2">
          {section.teacherNationalities.map((country) => (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <CircleFlag
                    countryCode={country.toLowerCase()}
                    className="w-4 h-4 text-muted-foreground "
                    aria-disabled
                    aria-hidden
                    title={undefined}
                    aria-label={undefined}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{AllCountiresRecord[country.toUpperCase()].name ?? country}</p>
                </TooltipContent>
              </Tooltip>
            </>
          ))}
        </div>

        {section.teacherNationalities.length === 0 && (
          <p className="font-medium w-full">No Country Provided</p>
        )}
      </div>

      <div className=" flex space-x-4 items-center">
        <Label className="text-sm text-muted-foreground w-fit">Teacher Languages</Label>

        <div className=" flex space-x-2">
          {section.teacherLanguages.map((language) => (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <CircleFlagLanguage
                    languageCode={language.toLowerCase()}
                    className="w-4 h-4 text-muted-foreground "
                    aria-disabled
                    aria-hidden
                    title={undefined}
                    aria-label={undefined}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{AllLanguagesRecord[language.toLowerCase()]?.name ?? language}</p>
                </TooltipContent>
              </Tooltip>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffCardContent;
