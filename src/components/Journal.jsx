import React, { useState, useEffect } from 'react'
import './JournalDesign.css'


const Journal = () => {

    const time = new Date();
    const date = time.toLocaleString();

    const [isDragging, setIsDragging] = useState(false);
    const [selected, setSelected] = useState([]);
    const [color, setColor ] = useState("white")

    const handleMouseDown = (id) => {
        setIsDragging(true);
        setSelected(prev =>
            prev.includes(id) 
            ? prev.filter(item=> item!==id)
            : [...prev,id]
        )
        setColor(prev=> prev==="white"? "green": "white")
    };

    const handleMouseEnter = (id) => {
    if (!isDragging) return;
    setSelected(prev =>
        prev.includes(id) 
        ? prev.filter(item=> item!==id)
        : [...prev,id]
    )
    setColor(prev=> prev==="white"? "green": "white")
    };

    const handleMouseUp = () => {
    setIsDragging(false);
    }

    useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDrag);

    return () => window.removeEventListener("mouseup", stopDrag);
    }, []);


  return (
    <div className='JournalBox'>
        <div className='JournalHead'>
            <h1>{date}</h1>
        </div>
        <div className='left'>
            <div className='leftHead'></div>
            <div className={`trackerContainer ${isDragging ? "no-select" : ""}`}>
                {Array.from({ length: 24 }, (_, i) => (5 + i) % 24).map((h, i) => {
                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                    const period = h < 12 ? "AM" : "PM";

                    return (
                    <div key={i} className='tracker'>
                        <div className='timeSluts'>
                            {hour12} {period}
                        </div>

                        <div className='timeBars'>
                            {[0, 1].map((half) => {
                            const id = 2 * i + half;

                            return (
                                <div
                                key={id}
                                className={`halfBar ${
                                    selected.includes(id) ? "active" : ""
                                }`
                                }
                                onMouseDown={() => handleMouseDown(id)}
                                onMouseEnter={() => handleMouseEnter(id)}
                                onMouseUp={handleMouseUp}
                                ></div>
                            );
                            })}
                        </div>

                        <div className='timeNotes'>
                            <textarea className="timeNote" />
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
        
        <div className='right'>
            <div className='rightHead'></div>
            <textarea className='JournalText'></textarea>
        </div>
    </div>
  )
}

export default Journal