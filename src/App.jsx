import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import JobCard from "./components/jobCard/JobCard";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/searchBar/SearchBar";
import JobDummyData from "./jobDummyData";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(
      jobsRef,
      where("type", "==", jobCriteria.type),
      where("title", "==", jobCriteria.title),
      where("location", "==", jobCriteria.location),
      where("experience", "==", jobCriteria.experience),
      orderBy("postedOn", "desc")
    );
    const req = await getDocs(q);
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <Header />
        <SearchBar fetchJobsCustom={fetchJobsCustom} />
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </>
  );
}

export default App;
