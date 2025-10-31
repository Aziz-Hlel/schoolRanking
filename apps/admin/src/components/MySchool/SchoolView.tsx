import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Users,
  GraduationCap,
  Building,
  CircleDollarSign,
  type LucideProps,
  School,
} from "lucide-react";
import GeneralCardContent from "./GeneralCardContent";
import AcademicCardContent from "./AcademicCardContent";
import FacilitiesCardContent from "./FacilitiesCardContent";
import StaffCardContent from "./StaffCardContent";
import MediaCardContent from "./MediaCardContent";
import SectionHeader from "./SectionHeader";
import { useDetailedSchool } from "@/contexts/DetailedSchoolProvider";

interface sectionsProps {
  id: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  component: ReactNode;
  editPath: string;
}

export const SchoolView = () => {
  const { detailedSchool } = useDetailedSchool();

  if (!detailedSchool) return <div className="p-4">Loading school data...</div>;

  const sections: sectionsProps[] = [
    {
      id: "general",
      title: "School Information",
      icon: School,
      color: "bg-blue-100 text-blue-800",
      editPath: "edit/general",
      component: <GeneralCardContent section={detailedSchool.schoolGeneral} />,
    },
    {
      id: "academic",
      title: "Academic Programs",
      icon: GraduationCap,
      color: "bg-green-100 text-green-800",
      editPath: "edit/academics",
      component: <AcademicCardContent section={detailedSchool.schoolAcademics} />,
    },
    {
      id: "facilities",
      title: "Facilities & Resources",
      icon: Building,
      color: "bg-purple-100 text-purple-800",
      editPath: "edit/facilities",
      component: <FacilitiesCardContent section={detailedSchool.schoolFacilities} />,
    },
    {
      id: "staff",
      title: "Staff Information",
      icon: Users,
      color: "bg-orange-100 text-orange-800",
      editPath: "edit/staff",
      component: <StaffCardContent section={detailedSchool.schoolStaff} />,
    },
    {
      id: "media",
      title: "Media & Links",
      icon: Globe,
      color: "bg-pink-100 text-pink-800",
      editPath: "edit/media",
      component: <MediaCardContent section={detailedSchool.schoolMedia} />,
    },
    {
      id: "fees",
      title: "Fees & Payments",
      icon: CircleDollarSign,
      color: "bg-yellow-100 text-yellow-800",
      editPath: "edit/fees",
      component: <MediaCardContent section={detailedSchool.schoolMedia} />,
    },
  ];

  const Icon = sections[0].icon;
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {
          sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="h-fit">
                <SectionHeader color={section.color} title={section.title} icon={Icon} editPath={section.editPath} />
                <CardContent className="pt-0">
                  {section.component}
                </CardContent>
              </Card>
            );
          })

        }
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <Card key={sections[0].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[0].color}
            title={sections[0].title}
            icon={sections[0].icon}
            editPath={sections[0].editPath}
            editable={detailedSchool.schoolGeneral ? true : false}
          />
          <CardContent className="pt-0">
            <GeneralCardContent section={detailedSchool.schoolGeneral} />
          </CardContent>
        </Card>

        <Card key={sections[1].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[1].color}
            title={sections[1].title}
            icon={sections[1].icon}
            editPath={sections[1].editPath}
            editable={detailedSchool.schoolAcademics ? true : false}
          />
          <CardContent className="pt-0">
            <AcademicCardContent section={detailedSchool.schoolAcademics} />
          </CardContent>
        </Card>

        <Card key={sections[2].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[2].color}
            title={sections[2].title}
            icon={sections[2].icon}
            editPath={sections[2].editPath}
            editable={detailedSchool.schoolFacilities ? true : false}
          />
          <CardContent className="pt-0">
            <FacilitiesCardContent section={detailedSchool.schoolFacilities} />
          </CardContent>
        </Card>

        <Card key={sections[3].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[3].color}
            title={sections[3].title}
            icon={sections[3].icon}
            editPath={sections[3].editPath}
            editable={detailedSchool.schoolStaff ? true : false}
          />
          <CardContent className="pt-0">
            <StaffCardContent section={detailedSchool.schoolStaff} />
          </CardContent>
        </Card>

        <Card key={sections[4].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[4].color}
            title={sections[4].title}
            icon={Icon}
            editPath={sections[4].editPath}
            editable={detailedSchool.schoolMedia ? true : false}
          />
          <CardContent className="pt-0">
            <MediaCardContent section={detailedSchool.schoolMedia} />
          </CardContent>
        </Card>

        <Card key={sections[5].id + "xx"} className="h-fit">
          <SectionHeader
            color={sections[5].color}
            title={sections[5].title}
            icon={sections[5].icon}
            editPath={sections[5].editPath}
            editable={detailedSchool.schoolFees ? true : false}
          />
          <CardContent className="pt-0">
            <MediaCardContent section={detailedSchool.schoolMedia} />
          </CardContent>
        </Card>
      </div>

      {/* <EditSchoolSectionDialog
        section={editingSection}
        open={!!editingSection}
        onOpenChange={(open) => !open && setEditingSection(null)}
        onSave={(data: any) => {
          console.log('Saving section data:', editingSection, data);
          setEditingSection(null);
        }}
      /> */}
    </div>
  );
};
