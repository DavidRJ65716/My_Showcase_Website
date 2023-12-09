import { useState } from "react"
import { categories } from "../data/pillData"
import { CategoryPills } from "../components/CategoryPills"
import { videos } from "../data/VideoData"
import { VideoGridItem } from "../components/VideoGridItem"


export function Home(){

    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    
    return(  

        <div className="overflow-x-hidden px-8 pb-4">
            <div className='sticky top-0 bg-white z-10 pb-4'>
                <CategoryPills  
                    categories={ categories }
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory}
                />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {videos.map(video => (
                    <VideoGridItem key={video.id} {...video}/>
                ))}
            </div>
        </div>
    )
}