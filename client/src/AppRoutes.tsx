import Home from "./page/Home";
import { LayoutMain,LayoutVideo } from "./layouts/Layout"

const AppRouters = [
    {
        layout: LayoutMain,
        routes: [
            {
                name: 'Home',
                title: 'Home Page',
                componet: Home,
                path: '/'
            },
            {
                name: 'Home',
                title: 'Home Page',
                componet: Home,
                path: '/shorts'
            }
        ]
    }, 
    {
        layout: LayoutVideo,
        routes: [
            {
                name: 'Watch',
                title: 'Home Page',
                componet: Home,
                path: '/watch'
            }
        ]
    }

];

export default AppRouters;