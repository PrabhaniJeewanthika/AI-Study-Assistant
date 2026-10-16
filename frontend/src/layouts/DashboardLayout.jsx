import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex selection:bg-zinc-800 selection:text-white">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen p-8 overflow-y-auto bg-black">
        <Outlet />
      </main>
    </div>
  );
}
