import { CountryEnums } from '@/enums/CountryEnums';
import type { SchoolGeneral } from '@/types/School2.type';
import { Globe, MapPin } from 'lucide-react';
import { CircleFlag, countries } from 'react-circle-flags';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { countries as countriesData, callingCodes } from 'country-data-list';
import { AllCountiresRecord } from '@/constants/Countires_Languages_Record';

const GeneralCardContent = ({ section }: { section?: SchoolGeneral }) => {
  if (!section) return null;

  countriesData.all;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">School Name</p>
          <p className="font-medium">{section.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Established</p>
          <p className="font-medium">{section.yearEstablished}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">School Type</p>
          <p className="font-medium">{section.type}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Curriculum</p>
          <p className="font-medium">IB</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p
          className="font-medium w-full  truncate"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {section.description && section.description === ''
            ? section.description
            : 'No Description Provided'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <CircleFlag
          countryCode={CountryEnums[
            section.country as keyof typeof CountryEnums
          ]?.value.toLowerCase()}
          className="w-4 h-4 text-muted-foreground "
        />
        <p className="text-sm">{`${CountryEnums[section.country as keyof typeof CountryEnums]?.label ?? section.country}, ${section.city}, ${section.address}`}</p>
      </div>
      <div className="flex items-start gap-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <a href={section.website} className="text-sm text-blue-600 hover:underline">
          {section.website ?? 'No Url Provided'}
        </a>
      </div>

      <div className=" flex space-x-4 items-center">
        <Label className="text-sm text-muted-foreground w-fit ">School Countries</Label>

        <div className=" flex space-x-2">
          {section.campusCountries.map((country) => (
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
        {section.campusCountries.length === 0 && (
          <p className="font-medium w-fit">No Country Provided</p>
        )}
      </div>
    </div>
  );
};

export default GeneralCardContent;
