import { Play, Pause, VolumeX, Volume1, Volume2, Maximize, Minimize, Square, RectangleHorizontal, RefreshCcw } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"
import { FormatDuration } from "../utils/FormatDuration"
import { useVideoPlayerContext } from "../contexts/VideoPlayerContext"

type VideoPlayerPops = {
    videoUrl: string
    videoUrlTime: number
}

export function VideoPlayer({videoUrl, videoUrlTime}:VideoPlayerPops) {

    const [isContolShowing, setIsControlShowing] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const { isTheaterMode, isVideoPlaying, isMuted, volumeLevel, sliderLevel, videoTimer, videoPercent,
        isVideoEnd,
        theaterModeToggle, videoPercentHandaler, videoPlayToggle, videoTimerHandaler, muteToggle,
        volumeLevelHandler, sliderLevelHandler, endVideoHandler
    } = useVideoPlayerContext()

    useEffect(()=> {
        
        if (videoRef.current == null) return

        //videoRef.current.requestFullscreen
        videoRef.current.addEventListener('timeupdate', videoCurrentTime)
        window.addEventListener("focus",onFocus)

        window.addEventListener('load', () => {
            if (videoRef.current == null) return

            videoRef.current.play
            videoRef.current.currentTime = videoUrlTime
            videoPlayToggle()
        });


        if (isTheaterMode)  {
            videoRef.current.currentTime = videoTimer
        }

        return () => {
            window.removeEventListener("focus",onFocus)
            videoRef.current?.removeEventListener('timeupdate', videoCurrentTime)
            
        } 
    },[isTheaterMode, isVideoEnd])

    const onFocus = () => {

    }

    const fullScreenHandler = () => {
        const fullScreen = document.getElementById("video")
        
        if (!document.fullscreenEnabled){ 
            fullScreen?.parentNode?.removeChild(fullScreen)
            throw new Error("Fullscreen no available")
        }
        
        if (document.fullscreenElement){
            document.exitFullscreen()
            setIsFullScreen(false)
        } else {
            fullScreen?.requestFullscreen()
            setIsFullScreen(true)
        }
        document.addEventListener("fullscreenchange", () => {} )
        
    }

    const videoCurrentTime = () => {
        if (videoRef.current == null) return
        const videoTime = videoRef.current.currentTime
        videoTimerHandaler(videoTime)
        videoPercentHandaler(videoTime/videoDuration())
    }

    const videoDuration = () => {
        if (videoRef.current == null) return 0
        const duration = videoRef.current.duration
        if (duration == null) return 0
        return duration
    }

    const videoPlayHandler = () => {
        if (videoRef.current == null) return
        videoPlayToggle()
        if (isVideoEnd) {
            endVideoHandler(false)
            videoRef.current.play()
            videoRef.current.currentTime = 0
            setIsControlShowing(false)
            videoPlayToggle()
        } else {
           if (isVideoPlaying){
                videoRef.current.pause()
                setIsControlShowing(true)
            } else {
                videoRef.current.play()
                videoRef.current.currentTime = videoTimer
                setIsControlShowing(false)
            }
        }
    }

    //0 to 100 are the only numbers in scope
    const setVideoVolume = (newVolume: number) => {
        if (videoRef.current == null) return
        videoRef.current.volume = newVolume/100
    }

    const muteHandler = () => {
        
        if (volumeLevel === 0 && isMuted) {
            sliderLevelHandler(20)
            volumeLevelHandler(20)
            setVideoVolume(20)
        } else if (!isMuted) {
            sliderLevelHandler(0)
        } else {
            sliderLevelHandler(volumeLevel)
        }
        muteToggle(null)
    }

    const replayHandler = () => {
        endVideoHandler(true)
        setIsControlShowing(true)
    }

    //Handalse volume slide on inpute range
    const volumeHandler = (newVolume: React.ChangeEvent<HTMLInputElement>) => {
        volumeLevelHandler(Number(newVolume.target.value))
        if (volumeLevel === 0) {
            sliderLevelHandler(0)
            muteToggle(true)
        } else {
            muteToggle(false)
            sliderLevelHandler(volumeLevel)
            setVideoVolume(volumeLevel)
        }
    }

    //Changes volume when users clicks on slider randomly
    const sliderClickHandler = () => {
        if (volumeLevel === 0) {
            sliderLevelHandler(0)
            muteToggle(true)
        } else {
            muteToggle(false)
            sliderLevelHandler(volumeLevel)
            setVideoVolume(volumeLevel)
        }
    }
    //w-full
    //max-h-[85vh] bg-black
    return (
        <div id="video" className={'relative group/control '} >{/*video container*/}
            <div 
                className={`transition-opacity ${isContolShowing ? "opacity-100" : "group-hover/control:opacity-100 opacity-0"} 
            `}>{/*video controll conatiner*/}
                <div>{/*time-line container*/}
                </div>
                <div className="bottom-0 absolute bg-gradient-to-t w-full from-black to-transparent aspect-[6/1] opacity-50"/>{/*Bottom gradiant*/}
                <div className={`absolute bottom-0 inset-x-0 z-[100] flex justify-between px-3`}>{/*video Controlls*/}
                    <div className="flex justify-center flex-nowrap"> {/*controls left side*/}                    
                        <div>{/*play button*/}
                            <Button
                                onClick={videoPlayHandler} 
                                variant={"player"} 
                                size={"player"}
                            >
                                <Play className={`
                                        ${isVideoPlaying && "hidden"}
                                        ${isVideoEnd && "hidden" }
                                    `}
                                    color="white"
                                />
                                <Pause className={`
                                        ${!isVideoPlaying && "hidden" } 
                                        ${isVideoEnd && "hidden" }
                                    `} 
                                    color="white"
                                />
                                <RefreshCcw className={`${!isVideoEnd && "hidden" }`} color="white"/>
                            </Button>
                        </div>
                        <div className="group/volume flex flex-row ">{/*volume button*/}
                            <Button
                                onClick={muteHandler} 
                                variant={"player"} 
                                size={"player"}
                            >
                                <VolumeX className={`${!isMuted && "hidden"}`} color="white" />
                                <Volume1 className={`${sliderLevel >= 50 && "hidden"} ${isMuted && "hidden"}`} color="white"/>
                                <Volume2 className={`${sliderLevel < 50 && "hidden"} ${isMuted && "hidden"}`} color="white"/>
                            </Button>
                            <div className="flex items-center px-1 py-4 ">
                                <input 
                                    className="w-0 origin-left scale-x-0 transition-transform group-hover/volume:w-[100px] group-hover/volume:scale-x-100"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={sliderLevel}
                                    onChange={volumeHandler}
                                    onClick={sliderClickHandler}
                                />
                            </div>
                        </div>
                        <div className="flex items-center flex-nowrap gap-1 text-white text-xs"> {/*time duration*/}
                            <span>{FormatDuration(Math.trunc(videoTimer))}</span>
                            <span>/</span>
                            <span>{FormatDuration(Math.trunc(videoDuration()))}</span>
                        </div>
                    </div>
                    <div className="flex justify-center flex-nowrap">{/*Controls right side*/}
                        <div><p>autoplay</p></div>
                        <div><p>close caption</p></div>
                        <div><p>settings</p></div>
                        <div><p>minni player</p></div>
                        <div className="block">
                            <Button
                                variant={"player"}
                                size={"player"}
                                onClick={()=>{theaterModeToggle()}}
                            >
                                <Square className={`${isTheaterMode && "hidden"}`} color="white"/>
                                <RectangleHorizontal className={`${!isTheaterMode && "hidden"}`} color="white"/>
                            </Button>
                        </div>
                        <div className="block">
                            <Button 
                                variant={"player"}
                                size={"player"}
                                onClick={()=>{fullScreenHandler()}}
                            >
                                <Maximize className={`${isFullScreen && "hidden"}`} color="white"/> 
                                <Minimize className={`${!isFullScreen && "hidden"}`} color="white"/>
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <video 
                className="block w-full"
                src={`${videoUrl}`} 
                ref={videoRef}
                onEnded={() => replayHandler()}
                muted={isMuted}
                playsInline={true}
                onClick={videoPlayHandler}
            />
        </div>

    )
}