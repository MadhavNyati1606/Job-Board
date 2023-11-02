import React, { useState } from 'react'
import './JobCard.css'
const JobCard = ({job}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const [displayCount, setDisplayCount] = useState(6);

  const loadMore = () =>{
    setDisplayCount(displayCount+6);
  }
  return (
    <div>
      {job.slice(0, displayCount).map((item) => (
                <div key={item.id} className='card'>
                  
                  {item.url ? (
                    <a href={item.url} target='_blank' rel = "noopener noreferrer" className='link-title'>{item.title}</a>
                  ): (
                    <div className="title">{item.title}</div>
                  )}
               
                  <div className="info">
                    <p> By - {item.by} : {formatTimestamp(item.time)} </p>
                  
                  </div>
                  </div>
            ))}

      {displayCount<job.length && (
        <button onClick={loadMore} className='button'>
          Load More
        </button>
      )}
    </div>
  )
}

export default JobCard
