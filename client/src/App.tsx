/*import { PageHeader }  from "./layouts/PageHeader"
import { CategoryPills } from './components/CategoryPills'
import { categories } from "./data/pillData"
import { useState } from "react"
import { VideoGridItem } from "./components/VideoGridItem"
import { videos } from "./data/VideoData"
import { SideBar } from "./layouts/sidebar/SideBar"
import { SidebarProvider } from "./contexts/SidebarContext"
*/
import { Routes, Route } from "react-router-dom"
import AppRouters from "./AppRoutes"


export default function App() {
    const layouts = AppRouters.map(({layout: Layout, routes }, index) => {
        
        return (
            <Route key={index} element={<Layout />}>
                {routes.map(({name, componet: Component, path}) => {
                    return (
                        <Route key={name} element={<Component />} path={path} />
                    )
                })}
            </Route>
        )
    })

    return <Routes>{layouts}</Routes>
}