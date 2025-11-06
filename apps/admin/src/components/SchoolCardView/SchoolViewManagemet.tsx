import { useEffect } from 'react';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import { Outlet, useParams } from 'react-router-dom';
import LoadingSpinner from '@/LoadingSpinner';

const SchoolViewManagemet = () => {
  const { detailedSchool, fetchDetailedSchool, isLoading } = useDetailedSchool();
  const school = detailedSchool!;

  const { schoolId: schoolIdParam } = useParams();

  useEffect(() => {
    console.log('schoolIdParam', schoolIdParam);
    if (schoolIdParam) {
      fetchDetailedSchool(schoolIdParam);
    }
  }, [schoolIdParam, fetchDetailedSchool]);

  console.log('school :', school);

  if (isLoading) return <LoadingSpinner />;

  if (!school || schoolIdParam !== school.schoolGeneral.id) return <LoadingSpinner />;

  return <Outlet />;
};

export default SchoolViewManagemet;
