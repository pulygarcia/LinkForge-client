import { useLocation } from "react-router-dom";
import HomeNavigation from './nav/HomeNavigation'
import AdminNavigation from './nav/AdminNavigation'
import Logo from './Logo'

export default function HomeView() {
    const location = useLocation();

    return (
        <header className="bg-slate-800 py-6">
        <div className="mx-auto max-w-5xl container flex flex-col md:flex-row items-center md:justify-between">
            <div className="w-full p-2 md:p-5 lg:p-0 md:w-1/3">
                <Logo />
            </div>
            <div className="md:w-1/3 md:flex md:justify-end">
                {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
            </div>
        </div>
    </header>
    );
  }