import React, { useState } from "react";
import axios from "axios";

function AddPlace() {
  const [placeName, setPlaceName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Place Name: " + placeName);

    const place = {
      placeName: placeName
    };

    axios.post('http://localhost:4000/api/place', place)
      .then()
      .catch();
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

export default AddPlace;