import React, { useContext,useState, useEffect } from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";

const ViewgetsComponent = () => {
  const [FormattedFeed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const userId = userContext.state?.id || '';

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed`, {
          method: 'GET',
          /*body: JSON.stringify({userId: userContext.state?.id, formattedFeed}),*/
          headers: { 'Content-Type': 'application/json', },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setFeed(data.gets);
        } else {
            alertContext.addAlert("Failed to fetch feed");
        }
      } catch (error) {
        console.error('Error fetching feed:', error);
        alertContext.addAlert("Failed to fetch feed");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [userContext.state?.id, FormattedFeed]);

  return (
    <div>
      <h1>Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {FormattedFeed.map((get) => (
            <div key={get.isReget ? get.reget_id : get.get_id}>
              <h2>{get.username}</h2>
              <p>{get.content}</p>
              {get.isReget && <p>Regeted by: {get.regeted_username}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewgetsComponent;
