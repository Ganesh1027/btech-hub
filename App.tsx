import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AcademicYear, Material, MaterialType } from './types';
import Header from './components/Header';
import YearTabs from './components/YearTabs';
import MaterialList from './components/MaterialList';
import AddMaterialModal from './components/AddMaterialModal';
import DiscussionBoard from './components/DiscussionBoard';
import WelcomeModal from './components/WelcomeModal';

interface User {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [materials, setMaterials] = useState<Material[]>(() => {
    try {
      const savedMaterials = localStorage.getItem('studyHubMaterials');
      return savedMaterials ? JSON.parse(savedMaterials) : [];
    } catch (error) {
      console.error("Could not load materials from localStorage", error);
      return [];
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<AcademicYear | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('studyHubUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Could not load user from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('studyHubMaterials', JSON.stringify(materials));
    } catch (error) {
      console.error("Could not save materials to localStorage", error);
    }
  }, [materials]);

  const handleUserSetup = (name: string) => {
    if (name.trim()) {
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: name.trim(),
      };
      try {
        localStorage.setItem('studyHubUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
      } catch (error) {
        console.error("Could not save user to localStorage", error);
        alert("There was an issue setting up your profile. Please try again.");
      }
    }
  };

  const handleAddMaterial = useCallback((material: Omit<Material, 'id' | 'uploaderId'>) => {
    if (!currentUser) return;
    const newMaterial: Material = {
      ...material,
      id: Date.now().toString(),
      uploaderId: currentUser.id,
    };
    setMaterials(prev => [newMaterial, ...prev]);
  }, [currentUser]);

  const handleDeleteMaterial = useCallback((id: string) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
  }, []);

  const filteredMaterials = useMemo(() => {
    return materials
      .filter(material => selectedYear === 'All' || material.year === selectedYear)
      .filter(material => material.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [materials, selectedYear, searchTerm]);

  if (!currentUser) {
    return <WelcomeModal onNameSubmit={handleUserSetup} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="flex-grow lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Study Materials</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Material</span>
              </button>
            </div>
            
            <YearTabs selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            
            <MaterialList materials={filteredMaterials} onDelete={handleDeleteMaterial} currentUserId={currentUser.id} />
          </div>

          {/* Discussion Board Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
             <div className="sticky top-24">
                <DiscussionBoard currentUser={currentUser} />
             </div>
          </div>
        </div>
      </main>

      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMaterial}
      />
    </div>
  );
};

export default App;