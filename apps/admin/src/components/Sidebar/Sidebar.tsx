import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';
import { ROLES } from '@/enums/roles';
import type { Page } from '@/types/page';
import { PAGES } from '@/data/pages';
import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { usePageContext } from '@/contexts/PageContext';
import { useOrdredPages } from '@/store/usePageStore';
import { CircleAlert } from 'lucide-react';
import { TOTAL_FORMS } from '@/constants/totalForms';
import CONSTS from '@/constants/CONST';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  ordredPages: Page[];
}

export const Sidebar: FC<SidebarProps> = ({}) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userRole = user.role;

  const { currentPage, changePage } = usePageContext();

  const ordredPages = useOrdredPages();

  console.log('ordredPages : : ', ordredPages);

  return (
    <div className="w-64 bg-[#FFFFFF] border-r border-gray-300 h-screen flex flex-col text-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-300 h-28 bg-[#FFFFFF]/90">
        <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
        <p className="text-xs text-gray-600 mt-1 tracking-wide">
          {user?.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'School Admin'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex flex-col space-y-1">
          {ordredPages.map((page, index) => {
            if (!page.allowedRoles.includes(userRole)) return null;
            const Icon = page.icon;
            const isActive = currentPage.id === page.id;

            return (
              <Link to={page.path} key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start h-10 rounded-md font-medium transition-all duration-200 text-gray-800 hover:bg-gray-200 hover:text-gray-900',
                    isActive && 'bg-gray-300 text-gray-900 border border-gray-400 shadow-sm',
                  )}
                  onClick={() => changePage(page)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="truncate">{page.sidebarTitle}</span>
                  {page.additionalInfo?.formsCompleted === false && (
                    <>
                      <span className="text-yellow-600 text-xs font-medium ml-2">
                        {page.additionalInfo?.lastFormStep}/{CONSTS.TOTAL_FORMS}
                      </span>
                      <CircleAlert className="text-yellow-600" />
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300 bg-[#FFFFFF]/90">
        <Link to={PAGES.profile.path}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start mb-2 h-10 text-gray-800 hover:text-gray-900 hover:bg-gray-200',
              currentPage.sidebarButton === PAGES.profile.sidebarButton &&
                'bg-gray-300 text-gray-900 border border-gray-400 shadow-sm',
            )}
            onClick={() => changePage(PAGES.profile)}
          >
            <User className="w-4 h-4 mr-2" />
            <span className="truncate">Profile</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start mb-3 h-10 text-red-600 hover:bg-red-100 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="truncate">Sign Out</span>
        </Button>

        <div className="flex items-center space-x-3 mt-2">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center shadow">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-900">{user?.username}</p>
            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
