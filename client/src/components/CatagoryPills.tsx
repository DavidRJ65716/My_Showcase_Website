import { Button } from "./Button";

export function CatagoryPills(){
    return (
        <div className="overflow-x-hidden relative">
            <div className="
                flex 
                whitespace-nowrap 
                gap-3 
                transition-transform 
                w[max-content]"
            >
                <Button
                    variant={'dark'} 
                    className="py1 px-3 rounded-lg whitespace-nowrap">
                    all
                </Button>
                <Button className="py1 px-3 rounded-lg whitespace-nowrap">
                    Gaming
                </Button>
            </div>
        </div>
    )
}