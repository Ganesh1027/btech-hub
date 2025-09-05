import React, { useState, useCallback } from 'react';
import { AcademicYear, Material, MaterialType } from '../types';

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (material: Omit<Material, 'id' | 'uploaderId'>) => void;
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MaterialType>(MaterialType.PDF);
  const [year, setYear] = useState<AcademicYear>(AcademicYear.FIRST);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a title.');
      return;
    }

    setIsUploading(true);

    if (type === MaterialType.YOUTUBE) {
      if (!link) {
        alert('Please provide a YouTube link.');
        setIsUploading(false);
        return;
      }
      onAdd({ title, type, year, url: link });
      handleClose();
    } else {
      if (!file) {
        alert('Please select a file to upload.');
        setIsUploading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const fileName = type === MaterialType.PDF ? file.name : undefined;
        onAdd({ title, type, year, url, fileName });
        handleClose();
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        alert("There was an error uploading the file. Please try again.");
        setIsUploading(false);
      }
      reader.readAsDataURL(file);
    }
  };
  
  const handleClose = useCallback(() => {
    setTitle('');
    setType(MaterialType.PDF);
    setYear(AcademicYear.FIRST);
    setFile(null);
    setLink('');
    setIsUploading(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Add New Material</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
              <select id="type" value={type} onChange={e => setType(e.target.value as MaterialType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {Object.values(MaterialType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Year</label>
              <select id="year" value={year} onChange={e => setYear(e.target.value as AcademicYear)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {Object.values(AcademicYear).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            {type === MaterialType.YOUTUBE ? (
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-slate-700 dark:text-slate-300">YouTube Link</label>
                <input type="url" id="link" value={link} onChange={e => setLink(e.target.value)} required placeholder="https://www.youtube.com/watch?v=..." className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">File</label>
                <div className="flex items-center space-x-4">
                  <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-slate-800 transition">
                      Choose File
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} accept={type === MaterialType.PDF ? '.pdf' : 'image/*'} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {file ? file.name : 'No file selected'}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Cancel</button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
              {isUploading ? 'Processing...' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialModal;