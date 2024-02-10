import { Link } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { useSidebarContext } from '../../../contexts/SidebarContext'
import logo from '../../../assets/Logo.png'
import { Menu } from 'lucide-react'

type PageHeaderFirstSectionProps = {
    hidden?: boolean
}

export function PageHeaderFirstSection( { hidden = false }: PageHeaderFirstSectionProps) {

    const { toggle } = useSidebarContext()
    //const { secondToggle } = useSidebarSecondContext()

    return(
        <div className={
            `gap-4 items-center 
            flex-shrink-0 
            ${hidden ? 'md:flex hidden' : 'flex'}`
        }>
            <Button onClick={() => {toggle();}} variant={'ghost'} size={'icon'} >
                <Menu />
            </Button>
            <Link to="/">
                <img src={ logo } className='h-6'/>
            </Link>
        </div>
    )
}