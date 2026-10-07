import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-main-bg text-main-text flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
