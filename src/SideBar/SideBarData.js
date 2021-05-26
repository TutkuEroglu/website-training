import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SendIcon from '@material-ui/icons/Send';
import WebIcon from '@material-ui/icons/Web';

export const SideBarData = [
    {
        title:"Anasayfa",
        icon:<HomeIcon/>,
        link: "/HomePage"
    },
    {
        title:"Gönderiler",
        icon:<WebIcon/>,
        link: "/posts"
    },
    {
        title:"Gönderi Yolla",
        icon:<SendIcon/>,
        link: "/createpost"
    },
    {
        title:"Hakkımdamızda",
        icon:<PostAddIcon/>,
        link: "/home"
    },
    {
        title:"Chat",
        icon:<PostAddIcon/>,
        link: "/Chat"
    },
    {
        title:"Alışveriş",
        icon:<PostAddIcon/>,
        link: "/Buy"
    },
]

    

