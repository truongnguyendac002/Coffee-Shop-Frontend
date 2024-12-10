import { Outlet } from "react-router-dom";
import Sidebar from "../components/adminpage/layout/sidebar";
import Topbar from "../components/adminpage/layout/topbar";

const AdminHome = () => {
    return (
        <>
            <Topbar />
            <div className="flex ">
                <div className="w-1/6">
                    <Sidebar />
                </div>

                <div className="w-5/6 pt-5 pl-5 bg-white">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminHome;
