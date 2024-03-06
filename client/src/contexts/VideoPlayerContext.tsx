import { ReactNode, createContext, useContext, useEffect, useState, useRef } from "react"
//import { useLocation } from "react-router-dom"

type VideoPlayerProps = { 
    children: ReactNode
}

type VidePlayerType = {
    isTheaterMode: boolean
    isFullScreen: boolean
    isVideoPlaying: boolean
    isContolShowing: boolean
    isMuted: boolean
    volumeLevel: number
    sliderLevel: number
    videoTimer: number
    videoPercent: number
    videoRef: React.RefObject<HTMLVideoElement>
    theaterModeToggle: () => void
    fullScreenToggle: () => void
    videoPlayToggle: () => void
    videoMuteToggle: () => void
    volumeHandler: (newVolume: React.ChangeEvent<HTMLInputElement>) => void
    HandleSliderClick: () => void
    videoDuration: () => number
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
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isContolShowing, setIsControlShowing] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volumeLevel, setVolumeLevel] = useState(0)
    const [sliderLevel, setSliderLevel] = useState(0)
    const [videoTimer, setVideoTimer] = useState(0)
    const [videoPercent, setVideoPercent] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(()=> {

        if (videoRef.current == null) return

        //videoRef.current.requestFullscreen
        videoRef.current.addEventListener('timeupdate', videoCurrentTime)

        return () => {
            //window.removeEventListener("focus",onFocus)
            videoRef.current?.removeEventListener('timeupdate', videoCurrentTime)
            
        }
    },[])

    const videoCurrentTime = () => {
        if (videoRef.current == null) return
        const videoTime = videoRef.current.currentTime
        setVideoTimer(videoTime)
        setVideoPercent(videoTime/videoDuration())
    }

    const videoDuration = () => {
        if (videoRef.current == null) return 0
        const duration = videoRef.current.duration
        if (duration == null) return 0
        return duration
    }

    const videoPlayToggle = () => {
        setIsVideoPlaying(v => !v)
        if (videoRef.current == null) return 0

        if (isVideoPlaying){
            videoRef.current.play()
            setIsControlShowing(false)
        } else {
            videoRef.current.pause()
            setIsControlShowing(true)
        }
    }

    //0 to 100 are the only numbers in scope
    const setVideoVolume = (newVolume: number) => {
        if (videoRef.current == null) return
        videoRef.current.volume = newVolume/100
    }

    const videoMuteToggle = () => {
        
        if (volumeLevel === 0 && isMuted) {
            setSliderLevel(20)
            setVolumeLevel(20)
            setVideoVolume(20)
        } else if (!isMuted) {
            setSliderLevel(0)
        } else {
            setSliderLevel(volumeLevel)
        }
        setIsMuted(m => !m)
    }

    //Handalse volume slide on inpute range
    const volumeHandler = (newVolume: React.ChangeEvent<HTMLInputElement>) => {
        setVolumeLevel(Number(newVolume.target.value))
        if (volumeLevel === 0) {
            setSliderLevel(0)
            setIsMuted(true)
        } else {
            setIsMuted(false)
            setSliderLevel(volumeLevel)
            setVideoVolume(volumeLevel)
        }
    }

    //Changes volume when users clicks on slider randomly
    const HandleSliderClick = () => {
        if (volumeLevel === 0) {
            setSliderLevel(0)
            setIsMuted(true)
        } else {
            setIsMuted(false)
            setSliderLevel(volumeLevel)
            setVideoVolume(volumeLevel)
        }
    }

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
            isVideoPlaying,
            isContolShowing,
            isMuted,
            volumeLevel,
            sliderLevel,
            videoTimer,
            videoPercent,
            videoRef,
            theaterModeToggle,
            fullScreenToggle,
            videoPlayToggle,
            videoMuteToggle,
            volumeHandler,
            HandleSliderClick,
            videoDuration
        }}>
            {children}
        </VideoPlayerContext.Provider>
    )
}