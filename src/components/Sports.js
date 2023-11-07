import React, { useContext, useEffect, useState } from "react";
import SportContext from "../context/SportContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Sports = () => {
  let navigate = useNavigate();
  const context = useContext(SportContext);

  const [sports, setSport] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const host = 'https://sports-nations-aeed0bb0afdc.herokuapp.com'
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          console.error('No token found.');
          // Handle the absence of a token, e.g., redirect to the login page.
          return;
        }
  
        const response = await axios.get(`${host}/api/sport/getAll`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const {data} = response.data;
        setSport(data);
        setLoading(false);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching sports:", error);
        navigate("/login");
      }
    };
  
    fetchData(); // Call the async function to fetch and set the data
  }, []);

  const cardsPerPage = 8;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const sportsSubset = sports.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className="display-6 text-primary text-center">Exciting Sports for You</h1>

      {loading ? (
        <p>Loading sports data...</p>
      ) : sports.length === 0 ? (
        <p>No sports to display</p>
      ) : (
        <div className="container mx-2">
          <div id="sports-card">
            {sportsSubset.map((sport) => (
              <div key={sport._id} className="card">
                <img src={sport.image} alt={sport.name} />
                <h2>{sport.name}</h2>
              </div>
            ))}
          </div>
          <div id="pagination" className="pagination">
            {Array.from({ length: Math.ceil(sports.length / cardsPerPage) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sports;
