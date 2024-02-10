import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type SidebarProviderProps = {
    children: ReactNode
}

type SidebarContextType = {
    isLargeOpen: boolean
    isSmallOpen: boolean
    isSecondOpen:boolean
    toggle: () => void
    close: () =>void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebarContext() {
    const value = useContext(SidebarContext)
    if (value == null) throw Error("Out of SidbarProvider scope")

    return value
}

export function SidebarProvider({ children }: SidebarProviderProps) {

    const [isLargeOpen, setIsLargeOpen] = useState(false)
    const [isSmallOpen, setIsSmallOpen] = useState(false)
    const [isSecondOpen, setIsSecondOpen] = useState(false)
    const location = useLocation()
    
    useEffect(() => {
        const handler = () => {
            if (!isScreenSmall()) setIsSmallOpen(false)
        }
        
        window.addEventListener("resize", handler)
        
        setIsSecondOpen(false)
        return () =>{
            window.removeEventListener("resize", handler)
        }
    }, [location])

    function isScreenSmall(){
        return window.innerWidth < 1280
    }

    function toggle() {
        if (isScreenSmall()) {
            setIsSmallOpen(s => !s)
           
        } else {
            setIsLargeOpen(l => !l)
        }
        setIsSecondOpen(so =>!so)
    }

    function close() {
        if (isScreenSmall()) {
            setIsSmallOpen(false)
        } else {
            setIsLargeOpen(false)
        }
        setIsSecondOpen(false)
    }

    return <SidebarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        isSecondOpen,
        toggle,
        close
    }}>
        { children }
    </SidebarContext.Provider>
}