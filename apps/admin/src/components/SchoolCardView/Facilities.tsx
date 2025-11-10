import { Badge } from '../ui/badge';
import type { SchoolFacilities } from '@/types/School2.type';
import { FacilityEnums } from '@/enums/FacilityEnums';
import { AccessibilityEnums } from '@/enums/AccessibilityEnums';
import { SustainabilityEnums } from '@/enums/SustainabilityEnums';
import {
  ShieldCheck,
  ShieldMinus,
  Stethoscope,
  Speech,
  HandPlatter,
  ChefHat,
  Bus,
  Bot,
  BotOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FacilitiesCardContent = ({ section }: { section?: SchoolFacilities }) => {
  if (!section) return null;

  return (
    <div className="flex flex-col space-y-6 p-4">
      {/* Facilities */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Facilities</p>
        <div className="flex flex-wrap gap-2">
          {section.facilities.map((f, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-blue-50 text-blue-700">
              {FacilityEnums[f as keyof typeof FacilityEnums]?.label ?? f}
            </Badge>
          ))}
        </div>
      </div>

      {/* Accessibility Features */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Accessibility Features</p>
        <div className="flex flex-wrap gap-2">
          {section.accessibilityFeatures.map((a, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-green-50 text-green-700">
              {AccessibilityEnums[a as keyof typeof AccessibilityEnums]?.label ?? a}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sustainability Practices */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">
          Sustainability Practices
        </p>
        <div className="flex flex-wrap gap-2">
          {section.sustainabilityPractices.map((s, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-purple-50 text-purple-700">
              {SustainabilityEnums[s as keyof typeof SustainabilityEnums]?.label ?? s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key Services with icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2 items-center">
          <ShieldCheck
            className={cn('w-5 h-5', section.safetyCompliance ? 'text-green-700' : 'text-gray-400')}
          />
          <span className="text-sm font-medium">Safety Compliance</span>
        </div>
        <div className="flex gap-2 items-center">
          {section.aiIntegration ? (
            <Bot className="w-5 h-5 text-green-700" />
          ) : (
            <BotOff className="w-5 h-5 text-gray-400" />
          )}
          <span className="text-sm font-medium">AI Integration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2 items-center">
          <Stethoscope
            className={cn('w-5 h-5', section.hasNurse ? 'text-green-700' : 'text-gray-400')}
          />
          <span className="text-sm font-medium">Nurse Presence</span>
        </div>
        <div className="flex gap-2 items-center">
          <Speech
            className={cn('w-5 h-5', section.hasPsychologist ? 'text-green-700' : 'text-gray-400')}
          />
          <span className="text-sm font-medium">Psychologist Presence</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2 items-center">
          <HandPlatter
            className={cn('w-5 h-5', section.hasFoodService ? 'text-green-700' : 'text-gray-400')}
          />
          <span className="text-sm font-medium">Food Service</span>
        </div>
        <div className="flex gap-2 items-center">
          <ChefHat
            className={cn('w-5 h-5', section.hasNutritionist ? 'text-green-700' : 'text-gray-400')}
          />
          <span className="text-sm font-medium">Nutritionist</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Bus
          className={cn(
            'w-5 h-5',
            section.hasTransportationServices ? 'text-green-700' : 'text-gray-400',
          )}
        />
        <span className="text-sm font-medium">Transportation Services</span>
      </div>

      {/* Industry Partnerships */}
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Industry Partnerships</p>
        <div className="flex flex-wrap gap-2">
          {section.industryPartnerships.map((p, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
              {p}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesCardContent;
