import React, { useState, useEffect } from 'react'

const Clock = () => {

const [time, setTime] = useState(new Date());

useEffect(()=>{
    setInterval(()=>{
        setTime(new Date());
    },1000)
},[time])

    let hours = time.getHours();
    let midriem = hours>=12? "PM" : "AM";
    hours = hours % 12 || 12;
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

  return (
    <div className='clock-container'>
        <h1 className='time'>{hours}:{minutes}:{seconds} {midriem}</h1>
    </div>
  )
}

export default Clock