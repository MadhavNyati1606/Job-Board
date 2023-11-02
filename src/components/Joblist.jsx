import React, { useEffect, useMemo, useState } from 'react'
import Loading from './Loading';
import JobCard from './JobCard';
import './Joblist.css';

// const Joblist = ({ jobid }) => {
//     const [job, setJob] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchJobData = async () => {
//         let jobs = [];
  
//         for (let i = 0; i < jobid.length; i++) {
//           const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobid[i]}.json`);
//           const data = await response.json();
//           jobs.push(data);
//         }
  
//         setJob(jobs);
//         console.log(jobs);
//         setLoading(false);
//       };
  
//       if (jobid.length > 0) {
//         fetchJobData();
//       }
//     }, [jobid]);
    
//     if(loading){
//         return <Loading/>
//     }
const Joblist = ({ jobid }) => {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobData = async (id) => {
      try {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching job data:', error);
          return null;
      }
  };

  const memoizedFetchJobData = useMemo(() => fetchJobData, []); // Memoize the fetch function

  useEffect(() => {
      const fetchData = async () => {
          try {
              const jobsData = await Promise.all(jobid.map(memoizedFetchJobData).filter(Boolean));
              setJob(jobsData);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching jobs data:', error);
          }
      };

      if (jobid.length > 0) {
          fetchData();
      }
  }, [jobid, memoizedFetchJobData]);

  if (loading) {
      return <Loading />;
  }
    return (
        <div className='joblist'>
            <JobCard job={job}/>
            
        </div>
    );
  };
  
  export default Joblist;
