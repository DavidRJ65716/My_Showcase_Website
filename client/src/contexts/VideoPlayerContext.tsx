import { ReactNode, createContext, useContext, useEffect, useState, useRef } from "react"
//import { useLocation } from "react-router-dom"

type VideoPlayerProps = { 
    children: ReactNode
}

type VidePlayerType = {
    isTheaterMode: boolean
    isVideoPlaying: boolean
    isMuted: boolean
    isVideoEnd: boolean
    volumeLevel: number
    sliderLevel: number
    videoTimer: number
    videoPercent: number
    theaterModeToggle: () => void
    videoPercentHandaler: (p: number) => void
    videoPlayToggle: () => void
    videoTimerHandaler: (t: number) => void
    muteToggle: (mu: boolean|null) => void
    volumeLevelHandler: (v: number) => void
    sliderLevelHandler: (s: number) => void
    endVideoHandler: (e: boolean) => void
}

const VideoPlayerContext = createContext<VidePlayerType | null>(null)

export function useVideoPlayerContext() {
    const value = useContext(VideoPlayerContext)
    if (value == null) throw Error("Out of VideoPlayerProvider scope")
    return value
}

export function VideoPlayerProvider ({children}: VideoPlayerProps) {
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoEnd, setIsVideoEnd] = useState(false)
    const [volumeLevel, setVolumeLevel] = useState(0)
    const [sliderLevel, setSliderLevel] = useState(0)
    const [videoTimer, setVideoTimer] = useState(0)
    const [videoPercent, setVideoPercent] = useState(0)

    useEffect(()=> {
        
    },[])

    function videoPercentHandaler(p: number) {
        setVideoPercent(p)
    }

    function videoTimerHandaler(t: number) {
        setVideoTimer(t)
    }

    function volumeLevelHandler(v: number) {
        setVolumeLevel(v)
    }

    function sliderLevelHandler(s: number) {
        setSliderLevel(s)
    }

    function muteToggle(mu: boolean|null) {

        if (mu !== null){
            setIsMuted(mu)
        } else {
            setIsMuted(m => !m)
        }
    }

    function endVideoHandler(e: boolean){
        setIsVideoEnd(e)
    }

    function videoPlayToggle() {
        setIsVideoPlaying(p => !p)
    }

    function theaterModeToggle() {
        setIsTheaterMode(t => !t)
    }

    return(
        <VideoPlayerContext.Provider value={{
            isTheaterMode,
            isVideoPlaying,
            isMuted,
            volumeLevel,
            sliderLevel,
            videoTimer,
            videoPercent,
            isVideoEnd,
            theaterModeToggle,
            videoPercentHandaler,
            videoPlayToggle,
            videoTimerHandaler,
            muteToggle,
            volumeLevelHandler,
            sliderLevelHandler,
            endVideoHandler
        }}>
            {children}
        </VideoPlayerContext.Provider>
    )
}