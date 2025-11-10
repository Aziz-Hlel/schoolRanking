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
    <div className="flex flex-col space-y-6 p-4">
      {/* Curriculum Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-600 uppercase">Curriculum</p>
        <div className="flex flex-wrap gap-2">
          {section.curriculums.map((curriculum, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                  {curriculum}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-800 shadow-lg border border-gray-200 rounded-md p-2">
                {CurriculumEnums[curriculum as keyof typeof CurriculumEnums]?.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Additional Curriculum */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-600 uppercase">Additional Curriculum</p>
        <div className="flex flex-wrap gap-2">
          {section.additionalCurriculums.map((item, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-700">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages & Accreditation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-200 py-2">
        <div>
          <p className="text-sm text-gray-500">Languages of Instruction</p>
          <p className="font-medium">{section.languagesOfInstruction}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Accreditation Links</p>
          <p className="font-medium text-xs text-blue-600">{section.accreditationDocsLinks}</p>
        </div>
      </div>

      {/* Grade Range */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Grade Range</p>
        <div className="flex flex-wrap gap-2">
          {section.levelsOffered.map((level, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
              {LevelEnums[level as keyof typeof LevelEnums]?.label ?? level}
            </Badge>
          ))}
        </div>
      </div>

      {/* International Accreditations */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">
          International Accreditations
        </p>
        <div className="flex flex-wrap gap-2">
          {section.internationalAccreditations.map((acc, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700">
              {acc}
            </Badge>
          ))}
        </div>
      </div>

      {section.additionalAccreditations?.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase mb-1">
            Additional Accreditations
          </p>
          <div className="flex flex-wrap gap-2">
            {section.additionalAccreditations.map((acc, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                {acc}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Programs Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <CircleCheckBig
            className={cn(
              'w-5 h-5',
              section.hasGiftedPrograms ? 'text-green-700' : 'text-gray-400',
            )}
          />
          <Label className="text-sm font-medium">Gifted & Talented Programs</Label>
        </div>
        <div className="flex items-center gap-2">
          <CircleCheckBig
            className={cn(
              'w-5 h-5',
              section.hasSpecialNeedsSupport ? 'text-green-700' : 'text-gray-400',
            )}
          />
          <Label className="text-sm font-medium">Special Needs Support</Label>
        </div>
      </div>
    </div>
  );
};

export default AcademicCardContent;
