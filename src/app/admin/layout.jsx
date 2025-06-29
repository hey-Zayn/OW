import SideBar from "../AdminComponents/SideBar";
import TopBarDashboard from "../AdminComponents/TopBarDashboard";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen w-full">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <TopBarDashboard />
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}