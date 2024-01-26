import { Outlet } from "react-router-dom"
//import { SidebarProvider } from "../contexts/SidebarContext"
import { PageHeader } from "./PageHeader"
import { SideBarMain } from "./sidebar/SideBarMain"

export function LayoutMain() { 

    return (

        <div className="max-h-screen flex flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
                <SideBarMain />
                <Outlet />
            </div>
        </div>

    )
}

export function LayoutVideo() { 

    return (

        <div className="max-h-screen flex flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
                <SideBarMain />
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}