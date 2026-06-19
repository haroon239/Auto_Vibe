import React, { useState } from 'react';
import Sidebar from '../Components/Dashboard/Sidebar';
import TopBar from '../Components/Dashboard/TopBar';
import Overview from '../Components/Dashboard/Overview';
import UsersTable from '../Components/Dashboard/UsersTable';
import ProductsTable from '../Components/Dashboard/ProductsTable';
import PackageMonitor from '../Components/Dashboard/PackageMonitor';
import PaymentsTable from '../Components/Dashboard/PaymentsTable';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('overview');

  const renderPage = () => {
    switch (activePage) {
      case 'overview':   return <Overview />;
      case 'users':      return <UsersTable />;
      case 'products':   return <ProductsTable />;
      case 'payments':   return <PaymentsTable />;
      case 'packages':   return <PackageMonitor />;
      default:           return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f8fc] overflow-hidden">
      {/* Sidebar - fixed left */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content - scrollable right */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


