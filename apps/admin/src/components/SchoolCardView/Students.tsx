import type { SchoolStudentsNoID } from '@/types/School2.type';
import React from 'react';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { AllCountiresRecord } from '@/constants/Countires_Languages_Record';
import { CircleFlag } from 'react-circle-flags';

const StudentsCardContent = ({ section }: { section: SchoolStudentsNoID }) => {
  if (!section) return null;
  return (
    <>
      <div className=" flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="font-medium">{section.totalStudents ?? 'Information indisclosed'}</p>
          </div>
        </div>
        <div className=" flex space-x-4 items-center">
          <Label className="text-sm text-muted-foreground w-fit">Teacher Nationalities</Label>

          <div className=" flex space-x-2">
            {section.nationalities.map((country) => (
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

          {section.nationalities.length === 0 && (
            <p className="font-medium w-fit">No Country Provided</p>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Average Students per Classroom</p>
          {section.averageStudentsPerClassroom.map((averageStudentsPerClassroom, index: number) => (
            <>
              <div key={index} className="flex  items-start">
                <h3 className="font-medium">{averageStudentsPerClassroom.grade}</h3>={' '}
                <h2>{averageStudentsPerClassroom.numberOfStudents}</h2>
              </div>
            </>
          ))}
          {section.averageStudentsPerClassroom?.length === 0 && (
            <p className="text-sm ">Information indisclosed</p>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Extracurricular Activities</p>
          {section.extracurricularActivities.map((extracurricularActivity, index: number) => (
            <>
              <div key={index} className="flex  items-start">
                <h3 className="font-medium">{extracurricularActivity.name}</h3>
              </div>
            </>
          ))}
          {section.averageStudentsPerClassroom?.length === 0 && (
            <p className="text-sm ">Information indisclosed</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentsCardContent;
