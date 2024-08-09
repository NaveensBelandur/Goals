import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import LoadingComponent from "./LoadingComponent";
import DataNotFound from "./DataNotFound";

const List = ({ heading, list, dailyloading }) => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const Datacollections = collection(db, "Goals");

  useEffect(() => {
    const GetMovieList = async () => {
      const data = await getDocs(Datacollections);
      const FilteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setData(FilteredData);
    };

    GetMovieList();
  }, []);

  if (heading === "Daily List" ? dailyloading : loading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className="container mt-5">
        {Data.length === 0 ? (
          <DataNotFound />
        ) : (
          <div className="row">
            {heading === "Daily List"
              ? list.map((data) => (
                  <div className="col-12 col-sm-6 col-md-4 mb-4" key={data.id}>
                    <div className="card h-100">
                      <div className="card-header fs-4">{heading}</div>
                      <div className="card-body">
                        <h5 className="card-title">{data.goal}</h5>
                        <p
                          className="card-text"
                          dangerouslySetInnerHTML={{ __html: data.text }}
                        ></p>
                      </div>
                    </div>
                  </div>
                ))
              : Data.map((data) => (
                  <div className="col-12 col-sm-6 col-md-4 mb-4" key={data.id}>
                    <div className="card h-100">
                      <div className="card-header fs-4">{heading}</div>
                      <div className="card-body">
                        <h5 className="card-title">{data.goal}</h5>
                        <p
                          className="card-text"
                          dangerouslySetInnerHTML={{ __html: data.text }}
                        ></p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  }
};

export default List;
