import { Outlet } from "react-router-dom"
import { SidebarProvider } from "../contexts/SidebarContext"
import { PageHeader } from "./PageHeader"
import { SideBar } from "./sidebar/SideBar"

export function LayoutMain() { 

    return (
        <SidebarProvider>
            <div className="max-h-screen felx flex-col">
                <PageHeader />
                <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export function LayoutVideo() { 

    return (
        <SidebarProvider>
            <div className="max-h-screen felx flex-col">
                <PageHeader />
                <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}