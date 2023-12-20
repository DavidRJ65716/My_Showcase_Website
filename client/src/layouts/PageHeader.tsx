import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from 'lucide-react'
import logo from '../assets/Logo.png'
import { Button } from '../components/Button'
import { useState } from 'react'

export function PageHeader(){
    const [showSearch, setShowSearch] = useState(false)
    return( 
        <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4'>
            <div className={
                `gap-4 items-center 
                flex-shrink-0 
                ${showSearch ? 'md:flex hidden' : 'flex'}`
            }>
                <Button variant={'ghost'} size={'icon'} >
                    <Menu />
                </Button>
                <a href="/">
                    <img src={ logo } className='h-6'/>
                </a>
            </div>
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
                    {/*<span>
                        <Search/>
                    </span>*/}
                   
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
                    />
                    <Button className='
                        py-2 
                        px-4 
                        rounded-r-full
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
