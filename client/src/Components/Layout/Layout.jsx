import { Outlet } from 'react-router-dom';
import { Header, Footer, Sidebar, Popup, LoginPopup } from '..';

export default function Layout() {
    return (
        <div className="overflow-y-scroll h-full w-full">
            <Header />
            <hr className="w-full" />
            <Sidebar />
            <main className="mt-[60px] p-6 min-h-[calc(100%-60px)] w-full">
                <Outlet />
            </main>
            <hr className="w-full" />
            <Footer />
            <Popup />
            <LoginPopup />
        </div>
    );
}
