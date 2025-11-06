import { Badge } from '../ui/badge';
import type { SchoolAcademics } from '@/types/School2.type';
import { LevelEnums } from '@/enums/LevelEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';
import { CircleCheckBig } from 'lucide-react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const AcademicCardContent = ({ section }: { section?: SchoolAcademics }) => {
  if (!section) return null;

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Curriculum</p>
          <div className="font-medium">
            <div className="flex flex-wrap gap-2">
              {section.curriculums.map((curriculum, index: number) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge key={index} variant="secondary" className="text-xs">
                      {curriculum}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{CurriculumEnums[curriculum as keyof typeof CurriculumEnums]?.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Additional Curriculum</p>
          <div className="font-medium">
            <div className="flex flex-wrap gap-2">
              {section.additionalCurriculums.map((additionalCurriculum, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {additionalCurriculum}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Languages of Instruction</p>
          {/* <p className="font-medium">8</p> */}
          <p className="font-medium">{section.languagesOfInstruction}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Accreditation links</p>
          <p className="font-medium text-xs overflow-hidden">{section.accreditationDocsLinks}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground ">Grade Range</p>

        <div className="flex flex-wrap gap-2">
          {section.levelsOffered.map((level, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {LevelEnums[level as keyof typeof LevelEnums]?.label ?? level + '-'}
            </Badge>
          ))}
        </div>
      </div>

      <div className=" flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">International Accreditations</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {/* {section.programs.map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                        </Badge>
                    ))} */}
          {section.internationalAccreditations.map((program: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {program}
            </Badge>
          ))}
        </div>
      </div>

      {section.additionalAccreditations && (
        <div>
          <p className="text-sm text-muted-foreground">Additional Accreditations</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {/* {section.programs.map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                        </Badge>
                    ))} */}
            {section.additionalAccreditations.map((program: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {program}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {/* <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.subjects.map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                        </Badge>
                    ))}
                </div>
            </div> */}

      <div className="flex space-x-2">
        <CircleCheckBig
          className={cn(
            ' w-4 h-4 ',
            section.hasGiftedPrograms ? 'text-green-700 ' : 'text-muted-foreground',
          )}
        />
        <Label className="">Gifted & Talented Programs</Label>
      </div>

      <div className="flex space-x-2">
        <CircleCheckBig
          className={cn(
            ' w-4 h-4 ',
            section.hasSpecialNeedsSupport ? 'text-green-700 ' : 'text-muted-foreground',
          )}
        />
        <Label className="">Special Needs Support</Label>
      </div>
    </div>
  );
};

export default AcademicCardContent;
