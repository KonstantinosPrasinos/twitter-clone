import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from "../context/AlertContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

const ViewCommentsForm = (post_id) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);



  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/replies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${post_id}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setReplies(data.posts);
        } else {
          alertContext.addAlert("Failed to fetch replies");
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
        alertContext.addAlert("Failed to fetch replies");
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, []);

  return (
    <div className={"Vertical-Flex-Container"}>
      <h2 style={{ textAlign: 'left' }}>Comments</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="Feed Post-Container">
          {replies.map((post) => (
            <div >
              <div className="Single-Post-Container">
                <div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ViewCommentsForm;