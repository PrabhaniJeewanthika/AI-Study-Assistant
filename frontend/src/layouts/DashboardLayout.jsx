import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex selection:bg-zinc-200 selection:text-black">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen p-8 overflow-y-auto bg-zinc-50">
        <Outlet />
      </main>
    </div>
  );
}
