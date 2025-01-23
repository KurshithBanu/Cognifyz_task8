import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [key, setKey] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // State for spinner
  const [jobStatus, setJobStatus] = useState(''); // State for job status

  // Fetch data from the backend
  const fetchData = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.get(`http://localhost:5000/api/data?key=${key}`);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Add a background job
  const addJob = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.post('http://localhost:5000/api/add-job', {
        task: `Task for key: ${key}`,
      });
      setJobStatus('Job added successfully!'); // Update job status
      alert(response.data.message);
    } catch (err) {
      console.error('Error adding job:', err);
      setJobStatus('Error adding job.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '35px'}}>Advanced Server-Side Functionality</h2>
      <input
        type="text"
        placeholder="Enter a key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={fetchData} style={{ padding: '10px', marginRight: '10px' }} disabled={loading}>
        Fetch Data
      </button>
      <button onClick={addJob} style={{ padding: '10px' }} disabled={loading}>
        Add Job
      </button>

      {/* Spinner */}
      {loading && <p>Loading...</p>}

      {/* Response Data */}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {/* Job Status */}
      {jobStatus && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h4>{jobStatus}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
