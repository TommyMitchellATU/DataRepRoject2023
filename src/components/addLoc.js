import React, { useState } from "react";
import axios from "axios";

function AddLoc() {
  const [placeName, setPlaceName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const place = {
      placeName: placeName
    };

    axios.post('http://localhost:4000/api/place', place)
      .then((response) => {
        console.log("Place added successfully!");
      })
      .catch((error) => {
        console.log("Error adding place:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Place Name: </label>
          <input
            type="text"
            className="form-control"
            value={placeName}
            onChange={(e) => { setPlaceName(e.target.value) }}
            
          />
        </div>
        <div>
          <input type="submit" value="Add Place" />
        </div>
      </form>
    </div>
  );
}

export default AddLoc;