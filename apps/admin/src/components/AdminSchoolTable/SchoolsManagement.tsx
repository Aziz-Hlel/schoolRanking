import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchoolDataTable } from './SchoolDataTable';
import useApiQuery from '@/hooks/useApiQuery';
import apiRoutes from '@/service/Api/apiRoutes';
import type { PageSchool } from '@/types/SchoolPage';
import { DataTablePagination } from './pagination/Pagination';
import { initialPageResponse, type PageableApiResponse } from '@/types/ApiPageResponse';

export const SchoolsManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const queryParams = { page, size };

  const { data: schoolData } = useApiQuery<PageSchool>({
    url: apiRoutes.school.getPageSchool(),
    queryParams,
    queryKey: ['schools', JSON.stringify(queryParams)],
    options: { fetchOnMount: true, config: { params: queryParams } },
  });

  const schools = schoolData?.success === true ? schoolData.data.content : [];
  const pageable: PageableApiResponse =
    schoolData?.success === true ? schoolData.data : initialPageResponse;

  const onPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const onNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleEditSchool = (id: string) => {
    console.log('Edit school:', id);
  };

  const handleDeleteSchool = (id: string) => {
    console.log('Delete school:', id);
    // setSchools(schools.filter((school) => school.id !== id));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setSize(newPageSize);
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Schools table</h2>
        </div>

        <Button onClick={handleAddSchool} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add School
        </Button>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <SchoolDataTable data={schools} onEdit={handleEditSchool} onDelete={handleDeleteSchool} />
          <div className="mt-4 border p-2 shadow-md rounded-md">
            <DataTablePagination
              pageable={pageable}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              className="mt-auto w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
