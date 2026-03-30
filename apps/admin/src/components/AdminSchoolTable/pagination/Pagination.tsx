import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PageableApiResponse } from '@/types/ApiPageResponse';
import { getDisplayedPageNumbers } from './getDisplayedPageNumbers';

type DataTablePaginationProps = {
  className?: string;
  pageable: PageableApiResponse;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
};

export function DataTablePagination({
  className,
  pageable,
  onPreviousPage,
  onNextPage,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const currentPage = pageable.pageable.pageNumber + 1;
  const totalPages = pageable.totalPages;
  const pageNumbers = getDisplayedPageNumbers(currentPage, totalPages);

  const previousPage = () => {
    const currentPageIndex = currentPage;
    currentPageIndex > 1 && onPreviousPage();
  };

  const nextPage = () => {
    const currentPageIndex = currentPage;
    if (currentPageIndex < totalPages) {
      onNextPage();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between overflow-clip px-2',
        '@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4',
        className,
      )}
      style={{ overflowClipMargin: 1 }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex w-25 items-center justify-center text-sm font-medium @2xl/content:hidden  2xl:hidden">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
          <Select
            value={`${pageable.pageable.pageSize}`}
            onValueChange={(value) => {
              onPageChange(1);
              onPageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pageable.pageable.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        </div>
      </div>

      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex w-25 items-center justify-center text-sm font-medium @max-3xl/content:hidden ">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="size-8 p-0 @max-md/content:hidden"
            onClick={() => onPageChange(1)}
            disabled={pageable.first}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={previousPage}
            disabled={pageable.first}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page number buttons */}
          {pageNumbers.map((pageNumber, index) => (
            <div key={`${pageNumber}-${index}`} className="flex items-center">
              {pageNumber === '...' ? (
                <span className="px-1 text-sm text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? 'default' : 'outline'}
                  className="h-8 min-w-8 px-2"
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  <span className="sr-only">Go to page {pageNumber}</span>
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={nextPage}
            disabled={pageable.last}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0 @max-md/content:hidden"
            onClick={() => onPageChange(totalPages)}
            disabled={pageable.last}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
