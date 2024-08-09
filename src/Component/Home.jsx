import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import List from "./List";
import AddList from "./AddList";
import { db } from "../Firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => {
  const [loggedIn, setLogged] = useState(false);
  const [daily, setDaily] = useState([]);
  const [dailyLoading, setDailyLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const LoggedIn = localStorage.getItem("Access-Token");
      if (LoggedIn) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    }
  }, []);

  const DailyCollections = collection(db, "DailyList");

  useEffect(() => {
    const GetDocsList = async () => {
      const Data = await getDocs(DailyCollections);
      const FilteredData = Data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDailyLoading(false);
      setDaily(FilteredData);
    };

    GetDocsList();
  }, []);

  if (loggedIn) {
    return (
      <>
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <AddList heading={"Daily List"} title={"Add Your Daily List"} />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <List heading={"Daily List"} list={daily} dailyloading={dailyLoading} />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <List heading={"Goals"} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Home;
