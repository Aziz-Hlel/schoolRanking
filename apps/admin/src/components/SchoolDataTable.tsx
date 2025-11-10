import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Search } from 'lucide-react';
import type { SchoolPage } from '@/types/SchoolPage';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  studentCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface SchoolDataTableProps {
  data: SchoolPage[];
  onEdit: (schoolId: string) => void;
  onDelete: (schoolId: string) => void;
}

export const SchoolDataTable: React.FC<SchoolDataTableProps> = ({ data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Define the keys you want to sort by, matching SchoolPage properties
  type SortableColumn = 'name' | 'adminUsername' | 'email' | 'studentCount';

  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredData = data.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.adminUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (sortOrder === 'asc') {
        return (aValue as number) - (bValue as number);
      } else {
        return (bValue as number) - (aValue as number);
      }
    }
  });

  const handleSort = (column: SortableColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#212E53] focus:border-[#212E53] shadow-sm"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#212E53] text-white">
              <TableRow className="bg-gradient-to-r from-emerald-300 to-green-200 text-white text-sm">
                <TableHead className=" bg-transparent" onClick={() => handleSort('name')}>
                  School {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead className=" bg-transparent" onClick={() => handleSort('adminUsername')}>
                  Admin {sortBy === 'adminUsername' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead className=" bg-transparent" onClick={() => handleSort('studentCount')}>
                  Email {sortBy === 'studentCount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 italic">
                    No schools found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((school) => (
                  <TableRow
                    key={school.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-500">
                          {`${school.country} - ${school.city}, ${school.address}`}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-gray-700">{school.adminUsername}</TableCell>
                    <TableCell className="text-gray-700">{school.email}</TableCell>
                    <TableCell className="text-gray-700">{school.phoneNumber}</TableCell>

                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${
                          school.isComplete ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'
                        } px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {school.isComplete ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`./${school.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer border-gray-300 hover:bg-[#212E53] hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
