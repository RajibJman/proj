import React, { useState, useEffect } from 'react';

export default function Alldata() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/allData', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.user)
          setResponseData(data.user);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed with error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {responseData ? (
        <div>
          {responseData.map(user => (
            <div key={user._id}>
              <label>Name:</label>
              <input type="text" value={user.name} readOnly />
              <br />
              <label>Email:</label>
              <input type="text" value={user.email} readOnly />
              <br />
              <label>Role:</label>
              <input type="text" value={user.role} readOnly />
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}