import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type FC } from 'react';

const AbstractUpdateHeader: FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { title: 'School Information', description: 'Basic details about your school' },
    { title: 'Academic Programs', description: 'Curriculum and accreditation details' },
    {
      title: 'Facilities & Sustainability',
      description: 'Infrastructure and environmental practices',
    },
    { title: 'Staff & Leadership', description: 'Team qualifications and structure' },
    { title: 'Media & Documentation', description: 'Links to reports and media content' },
    { title: 'School Fees', description: 'Fees and payment details' },
    { title: 'School Students', description: 'Number of students and nationalities' },
  ];

  return (
    <CardHeader className="bg-purple-50 rounded-2xl p-4 md:p-6 shadow-md border border-purple-200">
      {/* Titre */}
      <CardTitle className="text-xl lg:text-2xl font-bold text-purple-800">
        {steps[currentStep].title}
      </CardTitle>

      {/* Description */}
      <CardDescription className="text-sm lg:text-base text-purple-600 mt-1">
        {steps[currentStep].description}
      </CardDescription>

      {/* Ligne séparatrice */}
      <div className="mt-4">
        <div className="h-px w-full bg-purple-200" />
      </div>
    </CardHeader>
  );
};

export default AbstractUpdateHeader;
