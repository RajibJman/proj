import React, { useEffect, useState } from 'react';

function MarksAndModules() {
    const [moduleData, setModuleData] = useState([]);
    const [marksData, setMarksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                setError(error.message);
            }
        };

        // Function to get user ID from local storage
        const getUserIdFromLocalStorage = () => {
            return localStorage.getItem('userId');
        };

        // Fetch data
        const userId = getUserIdFromLocalStorage();
        const marksUrl = `http://localhost:3000/api/auth/marks/user/${userId}`;
        const modulesUrl = 'http://localhost:3000/api/auth/modules';

        console.log("Fetching data...");

        Promise.all([fetchData(marksUrl), fetchData(modulesUrl)])
            .then(([marksData, moduleData]) => {
                console.log("Marks data:", marksData);
                console.log("Module data:", moduleData);
                setMarksData(marksData);
                setModuleData(moduleData.modules);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });

    }, []);

    // Display component
    return (
        <div>
            <h1>Marks and Modules</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error &&
                <div>
                    {marksData.map((mark, index) => {
                        const module = moduleData.find(module => module._id === mark.moduleId);
                        return (
                            <div key={index}>
                                <p>Module Name: {module ? module.moduleName : "Module Not Found"}</p>
                                <p>Marks: {mark.marks}</p>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default MarksAndModules;
