import { Routes, Route } from "react-router-dom"
import AppRouters from "./AppRoutes"
import { SidebarProvider } from "./contexts/SidebarContext"

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

    return(
        <SidebarProvider>
                <Routes>
                        {layouts}
                </Routes>
        </SidebarProvider>
        
    ) 
        
}