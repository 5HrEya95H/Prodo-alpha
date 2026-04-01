import React, { useState } from 'react'
import './JournalDesign.css'


const Journal = () => {

    const [selectedCells, setSelectedCells] = useState([]);


    const handleDrag=()=>{

        const handleMouseDown=(index)=>{
            
        }
        const handleMouseDrag=()=>{

        }
        const handleMouseUp=()=>{

        }

    }


  return (
    <div>
        <div className='left'>
            <div className='trackerContainer'>
                {Array.from({ length: 24 }, (_, i) => (5 + i) % 24).map((h, i) => {
                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                    const period = h < 12 ? "AM" : "PM";

                    return (
                    <div className='tracker'>
                        <div key={i} className='timeSluts'>
                            {hour12} {period}
                        </div>
                        <div className='timeBars'>
                            <div className='timeBars'>
                                {[0, 1].map((half) => (
                                    <div
                                        key={half}
                                        id={`${2*i+half}`}   // unique id
                                        className='halfBar'
                                        onClick={(e)=>{console.log(e.target.id)}}
                                    ></div>
                                ))}
                                </div>
                        </div>
                        <div className='timeNotes'><textarea className="timeNote"/></div>
                    </div>
                    );
                })}
            </div>
        </div>
        <div className='right'>

        </div>
    </div>
  )
}

export default Journal