
import { useEffect, useState } from 'react';
import './App.css'
import Joblist from './components/Joblist'

function App() {
  const [jobid, setJobid] = useState([]);
  useEffect(()=>{
      const fetchJobId = async() =>{
          const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
          const data = await response.json();
          setJobid(data);
          console.log(data);
          
      }
      fetchJobId();
      console.log(jobid);
  },[])

  return (
   <div className='app'>
    <div className="heading">
      <div className="heading-1">
    <h1>Hacker News Job Board</h1>
      </div>
    </div>
    <div className="list">
    <Joblist jobid = {jobid}/>
    </div>
    </div>
  )
}

export default App
