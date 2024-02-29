import { ReactNode, createContext, useContext, useEffect, useState } from "react"
//import { useLocation } from "react-router-dom"

type VideoPlayerProps = { 
    children: ReactNode
}

type VidePlayerType = {
    isTheaterMode: boolean
    isFullScreen: boolean
    theaterModeToggle: () => void
    fullScreenToggle: () => void
}

const VideoPlayerContext = createContext<VidePlayerType | null>(null)

export function useVideoPlayerContext() {
    const value = useContext(VideoPlayerContext)
    if (value == null) throw Error("Out of VideoPlayerProvider scope")

    return value
}

export function VideoPlayerProvider ({children}: VideoPlayerProps) {
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isFullScreen, setIsVideoFullScreen] = useState(false)


    useEffect(() => {
        
    })

    function theaterModeToggle() {
        setIsTheaterMode(t => !t)
    }

    function fullScreenToggle() {
        setIsVideoFullScreen(f => !f)
    }

    return(
        <VideoPlayerContext.Provider value={{
            isTheaterMode,
            isFullScreen,
            theaterModeToggle,
            fullScreenToggle
        }}>
            {children}
        </VideoPlayerContext.Provider>
    )
}