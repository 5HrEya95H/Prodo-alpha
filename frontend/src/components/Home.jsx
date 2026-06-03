import React from 'react'
import homeBg from "../images/HomeBG.png";
import clockImg from "../images/Clock.png";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-screen h-screen'>
        <div className='w-full h-full absolute overflow-hidden bg-amber-400 min-w-[1600px]'><img className = "w-full h-auto"  src={homeBg} alt="homeBG image"/></div>
        <div className='w-[120px] h-[160px] absolute right-[200px] top-[560px]'>
            <Link><img className='h-full w-full' src={clockImg}/></Link>
        </div>
    </div>
  )
}

export default Home