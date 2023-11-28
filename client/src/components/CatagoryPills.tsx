import { ChevronLast, ChevronLeft, ChevronRight, Ghost } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";

type CatagoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

export function CatagoryPills({ categories, selectedCategory, onSelect }: CatagoryPillsProps){
    
    const [translate, setTraslate] = useState(0)
    const [isLeftVisibale, setIsLeftVisibale] = useState(false)
    const [isRightVisibale, setIsRightVisibale] = useState(false)
    
    return (
        
        <div className="overflow-x-hidden relative">
            <div className="
                flex 
                whitespace-nowrap 
                gap-3 
                transition-transform 
                w[max-content]"
            >   
                {categories.map(category=> (
                    <Button
                        key={category}
                        onClick={() => onSelect(category)}
                        variant={
                            `${selectedCategory === category ? 'dark': 'default'}`
                        } 
                        className="py-1 px-3 rounded-lg whitespace-nowrap ">
                            {category}
                    </Button>
                ))}
            </div>
            {isLeftVisibale && (
                <div className="
                    absolute 
                    left-0 
                    top-0.5 
                    -translate-y-0.5
                    bg-gradient-to-r
                    from-white
                    from-50%
                    to-transparent
                    w-24
                    h-full"
                    onClick={() => {
                        setTraslate(translate => {
                            const newTranslate = - TRANSLATE_AMOUNT
                            if (newTranslate <= 0) {
                                return 0
                            }
                            return newTranslate
                        })
                    }}
                >
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        className="h-full aspect-square w-auto p-1.5"
                    >
                        <ChevronLeft/>
                    </Button>
                </div>
            )}
            {isRightVisibale && (
                <div className="
                    absolute 
                    right-0 
                    top-0.5 
                    -translate-y-0.5
                    bg-gradient-to-l
                    from-white
                    from-50%
                    to-transparent
                    w-24
                    h-full
                    flex
                    justify-end
                ">
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        className="h-full aspect-square w-auto p-1.5"
                    >
                        <ChevronRight/>
                    </Button>
                </div>
            )}
        </div>
    )
}