import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit() {
  let { id } = useParams();

  const [place, setPlaceName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/place/' + id)
      .then((response) => {
        setPlaceName(response.data.place);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const location = {
      title: place,
      cover: '', // Add the appropriate value for the cover
      author: '' // Add the appropriate value for the author
    }

    axios.put('http://localhost:4000/api/place/' + id, location)
      .then((res) => {
        navigate('/read');
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Location: </label>
          <input
            type="text"
            className="form-control"
            value={place}
            onChange={(e) => { setPlaceName(e.target.value) }}
          />
        </div>
        <div>
          <input type="submit" value="Edit Location" />
        </div>
      </form>
    </div>
  );
}