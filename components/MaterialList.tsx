import React from 'react';
import { Material } from '../types';
import MaterialCard from './MaterialCard';

interface MaterialListProps {
  materials: Material[];
  onDelete: (id: string) => void;
  currentUserId: string;
}

const MaterialList: React.FC<MaterialListProps> = ({ materials, onDelete, currentUserId }) => {
  if (materials.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-white">No materials found</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter, or add a new material!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} onDelete={onDelete} currentUserId={currentUserId} />
      ))}
    </div>
  );
};

export default MaterialList;