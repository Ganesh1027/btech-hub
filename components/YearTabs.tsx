
import React from 'react';
import { AcademicYear } from '../types';

interface YearTabsProps {
  selectedYear: AcademicYear | 'All';
  setSelectedYear: (year: AcademicYear | 'All') => void;
}

const YEARS: (AcademicYear | 'All')[] = ['All', AcademicYear.FIRST, AcademicYear.SECOND, AcademicYear.THIRD, AcademicYear.FOURTH];

const YearTabs: React.FC<YearTabsProps> = ({ selectedYear, setSelectedYear }) => {
  return (
    <div className="mb-8 border-b border-slate-200 dark:border-slate-700">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {YEARS.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
              ${selectedYear === year
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
              }
            `}
          >
            {year}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default YearTabs;
