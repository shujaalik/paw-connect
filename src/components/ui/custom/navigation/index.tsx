import { useState } from "react";
import { FaHome, FaMap } from "react-icons/fa";
import { MdOutlinePets, MdOutlineCrisisAlert } from "react-icons/md";
import User from "../header/user";
// import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "@/assets/paw-connect-logo.png";
import {
    useNavigate
} from "react-router-dom";

const Navigation = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");

    const changePage = (page: string) => {
        setActiveTab(page);

        navigate(`/${page}`);
    }

    return <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full h-[10vh] flex px-5 justify-between items-center">
            <User />
            <div className="p-0 rounded-full  text-4xl">
                <img src={logo} alt="paw connect" className="w-auto h-20" />
                {/* <BsThreeDotsVertical className="opacity-70" /> */}
            </div>
        </div>
        <div className="h-[90vh] w-[100vw] overflow-auto">
            {children}
        </div>
        <div className="absolute h-[10vh] bottom-0 flex justify-center items-end w-full">
            <div className="w-full flex items-center justify-around gap-5 p-2 bg-white shadow-md transition-all duration-300">
                <NavItem label="Home" icon={<FaHome />} isActive={activeTab === "home"} onClick={() => changePage("home")} />
                <NavItem label="Map" icon={<FaMap />} isActive={activeTab === "map"} onClick={() => changePage("map")} />
                <NavItem label="Adoption" icon={<MdOutlinePets />} isActive={activeTab === "adoption"} onClick={() => changePage("adoption")} />
                <NavItem label="Lost & Found" icon={<MdOutlineCrisisAlert />} isActive={activeTab === "lost-and-found"} onClick={() => changePage("lost-and-found")} />
            </div>
        </div>
    </div>

    return <div className="absolute h-full pt-5 w-full flex flex-col justify-between items-center z-20">
        <div className="w-full flex px-5 justify-between items-center">
            <User />
            <div className="p-0 rounded-full  text-4xl">
                <img src={logo} alt="paw connect" className="w-auto h-20" />
                {/* <BsThreeDotsVertical className="opacity-70" /> */}
            </div>
        </div>
        <div className=" bottom-0 flex justify-center items-center w-full">
            <div className="w-full flex items-center justify-around gap-5 p-2 bg-white shadow-md transition-all duration-300">
                <NavItem label="Home" icon={<FaHome />} isActive={activeTab === "home"} onClick={() => changePage("home")} />
                <NavItem label="Map" icon={<FaMap />} isActive={activeTab === "map"} onClick={() => changePage("map")} />
                <NavItem label="Adoption" icon={<MdOutlinePets />} isActive={activeTab === "adoption"} onClick={() => changePage("adoption")} />
                <NavItem label="Lost & Found" icon={<MdOutlineCrisisAlert />} isActive={activeTab === "lost-and-found"} onClick={() => changePage("lost-and-found")} />
            </div>
        </div>
    </div>
}

const NavItem = ({ icon, label, isActive, onClick }: {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className={`text-3xl flex items-center gap-3 cursor-pointer transition-colors ${isActive ? "bg-primary text-muted" : "text-muted-foreground"} rounded-lg p-3`}
            onClick={onClick}
        >
            {icon}
            <span className={`font-semibold text-sm ${isActive ? "inline" : "hidden"}`}>{label}</span>
        </div>
    );
}

export default Navigation