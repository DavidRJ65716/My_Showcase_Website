import { Upload, Bell, User, Mic, Search, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/Button'
import { useState } from 'react'
import { PageHeaderFirstSection } from './components/PageHeaderComp'

export function PageHeader(){
    const [showSearch, setShowSearch] = useState(false)
    const [showSearchIcon, setShowSearchIcon] = useState(false)
    
    return( 
        <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4'>
            <PageHeaderFirstSection hidden={showSearch}/>
            <form className={`gap-4 flex-grow justify-center ${showSearch ? 'flex' : 'md:flex hidden'}`}>
                {showSearch && (

                    <Button
                    onClick={() => setShowSearch(false)} 
                    type='button' 
                    size={'icon'} 
                    variant={'ghost'} 
                    className='flex-shrink-0 md:hidden'
                    >
                        <ArrowLeft />
                    </Button>
                )}
                <div className='flex flex-grow max-w-[600px] '>    
                    
                    {/*<Search className=' absolute'/>*/}
                    <input 
                        type='search' 
                        placeholder='Search'
                        className='
                        rounded-l-full 
                        border 
                        border-secondary-boarder 
                        shadow-inner 
                        shadow-secondary
                        py-1
                        px-4
                        text-lg
                        w-full
                        focus:border-blue-500
                        outline-none'
                        onClick={() => {setShowSearchIcon(s => !s)}}
                        aria-haspopup={false}
                    />
                    <Button className='
                        py-2 
                        px-4 
                        rounded-r-full
                        relative
                        boarder
                        border-secondary-boarder
                        boarder-1-0
                        flex-shrink-0'
                    >
                        <Search />
                    </Button>
                </div>
                <Button type='button' size={'icon'} variant={`${showSearch ? 'ghost' : 'default'}`} className='flex-shrink-0'>
                    <Mic />
                </Button>
            </form>
            <div className={`flex-shrink-0 md:gap-2 ${showSearch ? 'md:flex hidden' : 'flex'}`}>
                <Button 
                    onClick={() => setShowSearch(true)} 
                    size={'icon'} 
                    variant={'ghost'} 
                    className='md:hidden'
                >
                    <Search />
                </Button>
                <Button size={'icon'} variant={'ghost'} className='md:hidden'>
                    <Mic />
                </Button>                
                <Button size={'icon'} variant={'ghost'}>
                    <Upload />
                </Button>
                <Button size={'icon'} variant={'ghost'}>
                    <Bell />
                </Button>
                <Button size={'icon'} variant={'ghost'}>
                    <User />
                </Button>
            </div>
        </div>
    )
}

