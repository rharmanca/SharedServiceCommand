import { useState } from 'react';
import HomePage from './pages/home';
import sharedServicesImage from '@assets/assets_task_01k0ahgtr1egvvpjk9qvwtzvyg_1752700690_img_1_1752767788234.webp';
import custodialDutyImage from '@assets/assets_task_01k0ah80j5ebdamsccd7rpnaeh_1752700412_img_0_1752768056345.webp';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const navLinks = [
    { name: 'Home', path: 'Home' },
    { name: 'Custodial', path: 'Custodial' },
    { name: 'Food Service', path: 'Food Service' },
    { name: 'Transportation', path: 'Transportation' },
    { name: 'Clinics', path: 'Clinics' },
    { name: 'Invoices', path: 'Invoices' },
    { name: 'Kitchen Equipment', path: 'Kitchen Equipment' },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <div className="text-center p-8">
            <div className="mt-8 flex justify-center">
              <img 
                src={sharedServicesImage} 
                alt="Shared Services Graphic" 
                className="rounded-lg shadow-lg max-w-full h-auto" 
              />
            </div>
          </div>
        );
      case 'Custodial':
        return (
          <div className="p-8 text-center">
            <h2 className="text-4xl font-bold text-blue-800 mb-6 font-inter-bold">Custodial Operations</h2>
            <div className="flex justify-center mb-8">
              <img 
                src={custodialDutyImage} 
                alt="Custodial Duty" 
                className="rounded-lg shadow-lg max-w-md h-auto" 
              />
            </div>
            <p className="text-xl text-gray-800 font-inter-regular mb-8">
              Cleanliness is a duty for all.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="retro-button bg-green-700 hover:bg-green-800 border-green-500">
                Submit New Inspection
              </button>
              <button className="retro-button bg-purple-700 hover:bg-purple-800 border-purple-500">
                View Inspection Data
              </button>
              <button className="retro-button bg-yellow-700 hover:bg-yellow-800 border-yellow-500 text-gray-900">
                Safety and Procedures
              </button>
            </div>
          </div>
        );
      case 'Food Service':
        return (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4 font-inter-bold">Food Service Division</h2>
            <p className="text-xl text-gray-800 font-inter-regular">
              Nourishing our community is vital.
            </p>
            <div className="mt-8 flex justify-center">
              <img 
                src="https://placehold.co/400x300/2C3E50/E0E0E0?text=FOOD+SERVICE+COMMUNITY" 
                alt="Food Service" 
                className="rounded-lg shadow-lg max-w-md h-auto" 
              />
            </div>
          </div>
        );
      case 'Transportation':
        return (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4 font-inter-bold">Transportation Logistics</h2>
            <p className="text-xl text-gray-800 font-inter-regular">
              Movement of goods and personnel is meticulously managed. Our transportation network is the lifeblood of our operations.
            </p>
          </div>
        );
      case 'Clinics':
        return (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4 font-inter-bold">Medical Clinics</h2>
            <p className="text-xl text-gray-800 font-inter-regular">
              The health of our comrades is our priority. Clinics provide essential care to keep our forces strong and resilient.
            </p>
          </div>
        );
      case 'Invoices':
        return (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4 font-inter-bold">Invoice Management</h2>
            <p className="text-xl text-gray-800 font-inter-regular">
              Precise accounting ensures the efficient allocation of resources. All invoices are processed with diligence.
            </p>
          </div>
        );
      case 'Kitchen Equipment':
        return (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4 font-inter-bold">Kitchen Equipment Inventory</h2>
            <p className="text-xl text-gray-800 font-inter-regular">
              Maintaining our culinary tools is paramount. A well-equipped kitchen ensures our comrades are well-fed.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white font-inter-regular p-4 flex flex-col items-center">
      {/* Header section with app title */}
      <header className="w-full max-w-4xl header-container p-6 rounded-lg shadow-xl mb-8 border-4 border-orange-400">
        <h1 className="text-6xl font-extrabold text-center text-orange-300 uppercase retro-header tracking-widest font-inter-bold">
          Shared Service Command
        </h1>
      </header>

      {/* Navigation section */}
      <nav className="w-full max-w-4xl nav-container p-4 rounded-lg shadow-lg mb-8 border-2 border-orange-300 flex flex-wrap justify-center gap-4">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setCurrentPage(link.path)}
            className={`retro-button ${currentPage === link.path ? 'active' : ''}`}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Main content area */}
      <main className="w-full max-w-4xl content-area p-8 rounded-lg shadow-xl border-4 border-blue-800">
        {renderPageContent()}
      </main>

      {/* Footer section */}
      <footer className="w-full max-w-4xl mt-8 text-center text-gray-300 text-sm font-inter-regular">
        <p>&copy; 2025 Shared Service Command. All rights reserved. For the People!</p>
      </footer>
    </div>
  );
}

export default App;
