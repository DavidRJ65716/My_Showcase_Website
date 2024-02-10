import { Outlet } from "react-router-dom"
//import { SidebarProvider } from "../contexts/SidebarContext"
import { PageHeader } from "./pageheader/PageHeader"
import { SideBarMain } from "./sidebar/SideBarMain"
import { SideBarWatch } from "./sidebar/SideBarWatch"

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
                <SideBarWatch />
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}