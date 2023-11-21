import { PageHeader }  from "./layouts/PageHeader"
import { CatagoryPills } from './components/CatagoryPills'
import { categories } from "./data/pillData"

export default function App() {

    return (
        <div className="max-h-screen felx flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <div>sidebar</div>
                <div className='sticky top-0 bg-white z-10 pb-4'>
                    <CatagoryPills  categories={ categories }/>
                </div>
            </div>
        </div>
    )
}

