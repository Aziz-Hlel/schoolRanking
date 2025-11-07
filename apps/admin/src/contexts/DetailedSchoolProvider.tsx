import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import apiRoutes from '@/service/Api/apiRoutes';
import useApiQuery from '@/hooks/useApiQuery';
import type { SchoolDetailed } from '@/types/School2.type';
import { useNavigate } from 'react-router-dom';

interface DetailedSchoolContextProps {
  detailedSchool: SchoolDetailed | undefined;
  fetchDetailedSchool: (schoolId: string) => void;
  fetchMyDetailedSchool: () => Promise<any>;
  isLoading: boolean;
}

const DetailedSchoolContext = createContext<DetailedSchoolContextProps | undefined>(undefined);

export const DetailedSchoolProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [schoolId, setSchoolId] = useState<string>('');

  const navigate = useNavigate();

  const { data, refetch, isError, isLoading } = useApiQuery<SchoolDetailed>({
    url: apiRoutes.school.getDetailedSchool(schoolId),
    queryKey: ['school', 'detailed', schoolId],
    options: { fetchOnMount: schoolId !== '' },
  });

  const detailedSchool = data && data.success === true ? data.data : undefined;

  useEffect(() => {
    if (isError) {
      navigate('/dashboard/school/404');
    }
  }, [isError, navigate]);

  const fetchDetailedSchool = (schoolId: string) => setSchoolId(schoolId);

  const fetchMyDetailedSchool = async () => await refetch();

  return (
    <DetailedSchoolContext.Provider
      value={{ detailedSchool, fetchDetailedSchool, fetchMyDetailedSchool, isLoading }}
    >
      {children}
    </DetailedSchoolContext.Provider>
  );
};

export const useDetailedSchool = () => {
  const context = useContext(DetailedSchoolContext);
  if (context === undefined)
    throw new Error('useDetailedSchool must be used within a DetailedSchoolProvider');

  return context;
};
