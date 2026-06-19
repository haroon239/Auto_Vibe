import React, { useState } from 'react';
import Sidebar from '../Componentss/Dashboard/Sidebar';
import TopBar from '../Componentss/Dashboard/TopBar';
import Overview from '../Componentss/dashboard/Overview';
import UsersTable from '../Componentss/dashboard/UsersTable';
import ProductsTable from '../Componentss/dashboard/ProductsTable';
import PackageMonitor from '../Componentss/dashboard/PackageMonitor';
import PaymentsTable from '../Componentss/dashboard/PaymentsTable';

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


