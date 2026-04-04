import React from 'react'
import './Inventory.css'
const Inventory = ({component}) => {
  return (
    <div className='Container'>
        <div className='CloseBtn'>X</div>
        {component}
    </div>
  )
}

export default Inventory