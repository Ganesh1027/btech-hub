import React from 'react';
import { Material, MaterialType } from '../types';

interface MaterialCardProps {
  material: Material;
  onDelete: (id: string) => void;
  currentUserId: string;
}

const getYoutubeThumbnail = (url: string): string => {
  let videoId = null;
  try {
    // Regex to extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    }
  } catch(e) {
    console.error("Invalid URL for YouTube thumbnail", e);
    // Fallback image if regex fails
    return 'https://picsum.photos/800/600';
  }

  return videoId 
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` 
    : 'https://picsum.photos/800/600';
};

const TypeIcon: React.FC<{ type: MaterialType }> = ({ type }) => {
  const baseClasses = "w-6 h-6";
  switch (type) {
    case MaterialType.PDF:
      return <svg xmlns="http://www.w3.org/2000/svg" className={`${baseClasses} text-red-500`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
    case MaterialType.IMAGE:
      return <svg xmlns="http://www.w3.org/2000/svg" className={`${baseClasses} text-blue-500`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>;
    case MaterialType.YOUTUBE:
      return <svg xmlns="http://www.w3.org/2000/svg" className={`${baseClasses} text-red-600`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;
    default:
      return null;
  }
};


const MaterialCard: React.FC<MaterialCardProps> = ({ material, onDelete, currentUserId }) => {
  const { id, title, type, year, url, uploaderId } = material;

  const thumbnail = type === MaterialType.YOUTUBE ? getYoutubeThumbnail(url) : url;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <div className="relative">
        {type === MaterialType.PDF ? (
          <div className="h-48 flex items-center justify-center bg-slate-100 dark:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="absolute top-2 right-2 bg-slate-900/50 text-white text-xs font-semibold px-2 py-1 rounded-full">{year}</div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-2">
            <TypeIcon type={type}/>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{type}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex-grow mb-4">{title}</h3>
        {type === MaterialType.PDF && <p className="text-sm text-slate-500 dark:text-slate-400 truncate mb-4">{material.fileName}</p>}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center mt-auto">
        <a href={url} target="_blank" rel="noopener noreferrer" download={material.fileName} className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline">
          {type === MaterialType.PDF ? 'Download' : 'View'}
        </a>
        {uploaderId === currentUserId && (
          <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
