import { PageHeader } from "./PageHeader"
import { SideBar } from "./sidebar/SideBar"

export default function Layouts() { 

    return (
        <div className="max-h-screen felx flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <SideBar />
                {/*page prop*/}
            </div>
        </div>
    )
}