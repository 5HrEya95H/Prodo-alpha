import React from 'react'
import '../Designs/InventoryDesign.css';

const Inventory = ({component}) => {
  return (
    <div className='Container'>
        <div className='CloseBtn'>X</div>
        {component}
    </div>
  )
}

export default Inventory