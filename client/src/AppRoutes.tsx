import Home from "./page/Home";
import Watch from "./page/Watch";
import { LayoutMain,LayoutVideo } from "./layouts/Layout"

const AppRouters = [
    {
        layout: LayoutMain,
        routes: [
            {
                name: 'Home',
                title: 'Home - Main Page',
                componet: Home,
                path: '/'
            },
            {
                name: 'shorts',
                title: 'Shorts',
                componet: Home,
                path: '/shorts'
            },
            {
                name: 'shorts',
                title: 'Shorts',
                componet: Home,
                path: '/library'
            },
            {
                name: 'shorts',
                title: 'Shorts',
                componet: Home,
                path: '/subscription'
            }
        ]
    }, 
    {
        layout: LayoutVideo,
        routes: [
            {
                name: 'Watch',
                title: 'Home - Main Page',
                componet: Watch,
                path: '/watch'
            }
        ]
    }

];

export default AppRouters;