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
import { Edit, Trash2, MoreHorizontal, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Admin } from '@/types/Admin';

interface AdminDataTableProps {
  data: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
}

export const AdminDataTable: React.FC<AdminDataTableProps> = ({ data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Admin>('username');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredData = data.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (column: keyof Admin) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Barre de recherche */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search administrators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-sm"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-emerald-300 to-green-200 text-white text-sm">
                <TableHead
                  className="min-w-[150px] px-6 py-3 font-semibold cursor-pointer  transition"
                  onClick={() => handleSort('username')}
                >
                  Full Name {sortBy === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="min-w-[200px] px-6 py-3 font-semibold cursor-pointer  transition"
                  onClick={() => handleSort('email')}
                >
                  Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="hidden lg:table-cell px-6 py-3 font-semibold">
                  Created
                </TableHead>
                <TableHead className="w-[70px] px-6 py-3 font-semibold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-400 italic">
                    No administrators found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((admin) => (
                  <TableRow
                    key={admin.id}
                    className="hover:bg-gray-50 transition-all duration-200 cursor-default border-b border-gray-100"
                  >
                    <TableCell className="px-6 py-4 font-medium">{admin.username}</TableCell>
                    <TableCell className="px-6 py-4">{admin.email}</TableCell>
                    <TableCell className="hidden lg:table-cell px-6 py-4 text-gray-500">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-600 hover:text-primary"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white shadow-lg rounded-md border"
                        >
                          <DropdownMenuItem
                            onClick={() => onEdit(admin)}
                            className="flex items-center gap-2 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4 text-primary" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(admin)}
                            className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
