import React from 'react';
import './App.css';
import JobPosting from './JobPostForm';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="row" className="col-md-12">Job Posting</h1>
        <JobPosting />
      </div>     
    </div>
  );
}

export default App;
