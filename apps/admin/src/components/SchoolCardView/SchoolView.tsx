import {
  type ForwardRefExoticComponent,
  type JSX,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Globe,
  Users,
  GraduationCap,
  Building,
  CircleDollarSign,
  type LucideProps,
  UsersRound,
  School,
} from 'lucide-react';
import GeneralCardContent from './General';
import AcademicCardContent from './Academics';
import FacilitiesCardContent from './Facilities';
import StaffCardContent from './Staff';
import MediaCardContent from './Media';
import SectionHeader from './SectionHeader';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import type { SchoolDetailed } from '@/types/School2.type';
import FeesCardContent from './Fees';
import StudentsCardContent from './Students';
type DivClassName = JSX.IntrinsicElements['div']['className'];

interface sectionsProps {
  id: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  className: DivClassName;
  component: ReactNode;
  editPath: string;
  detailedSchoolField?: keyof SchoolDetailed;
}

export const SchoolView = () => {
  const { detailedSchool } = useDetailedSchool();

  if (!detailedSchool) return <div className="p-4">Loading school data...</div>;

  const sections: sectionsProps[] = [
    {
      id: 'general',
      title: 'School Information',
      icon: School,
      className: 'bg-blue-100 text-blue-800',
      editPath: 'edit/general',
      component: <GeneralCardContent section={detailedSchool.schoolGeneral} />,
      detailedSchoolField: 'schoolGeneral',
    },
    {
      id: 'academic',
      title: 'Academic Programs',
      icon: GraduationCap,
      className: 'bg-green-100 text-green-800',
      editPath: 'edit/academics',
      component: <AcademicCardContent section={detailedSchool.schoolAcademics} />,
      detailedSchoolField: 'schoolAcademics',
    },
    {
      id: 'facilities',
      title: 'Facilities & Resources',
      icon: Building,
      className: 'bg-purple-100 text-purple-800',
      editPath: 'edit/facilities',
      component: <FacilitiesCardContent section={detailedSchool.schoolFacilities} />,
      detailedSchoolField: 'schoolFacilities',
    },
    {
      id: 'staff',
      title: 'Staff Information',
      icon: Users,
      className: 'bg-orange-100 text-orange-800',
      editPath: 'edit/staff',
      component: <StaffCardContent section={detailedSchool.schoolStaff} />,
      detailedSchoolField: 'schoolStaff',
    },
    {
      id: 'media',
      title: 'Media & Links',
      icon: Globe,
      className: 'bg-pink-100 text-pink-800',
      editPath: 'edit/media',
      component: <MediaCardContent section={detailedSchool.schoolMedia} />,
      detailedSchoolField: 'schoolMedia',
    },
    {
      id: 'fees',
      title: 'Fees & Payments',
      icon: CircleDollarSign,
      className: 'bg-yellow-100 text-yellow-800',
      editPath: 'edit/fees',
      component: <FeesCardContent section={detailedSchool.schoolFees} />,
      detailedSchoolField: 'schoolFees',
    },
    {
      id: 'students',
      title: 'Students & Nationalities',
      icon: UsersRound,
      className: 'bg-yellow-100 text-yellow-800',
      editPath: 'edit/students',
      component: <StudentsCardContent section={detailedSchool.schoolStudents} />,
      detailedSchoolField: 'schoolStudents',
    },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id} className="h-fit">
              <SectionHeader
                key={section.id}
                color={section.className}
                title={section.title}
                icon={Icon}
                editPath={section.editPath}
                editable={detailedSchool[section.detailedSchoolField] ? true : false}
              />
              <CardContent className="pt-0">{section.component}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
