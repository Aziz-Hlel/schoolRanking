import { PAGES } from '@/data/pages';

const MySchoolHeader = () => {
  const page = PAGES.personalSchool;

  return (
    <header className="h-28 bg-[#007198]  flex items-center justify-between px-8 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
      {/* <div className="flex justify-between items-center"> */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">{page.mainPageTitle}</h2>
        <p className="text-gray-300 mt-1 text-sm md:text-base">{page.mainPageDescription}</p>
      </div>
      {/* </div> */}
    </header>
  );
};

export default MySchoolHeader;
