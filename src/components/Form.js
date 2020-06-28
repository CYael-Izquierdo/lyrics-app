import React, {useState} from "react";
import Error from "./Error";

const Form = ({setLyricSearch}) => {

  const initialSearchState = {
    artist: "",
    song: ""
  }
  const [search, setSearch] = useState(initialSearchState);
  const {artist, song} = search;
  const [error, setError] = useState(false);
  // read input content
  const updateState = e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (artist.trim() === "" || song.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    setLyricSearch(search)
  }

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            onSubmit={handleSubmit}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Song Lyrics Finder</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artist</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      placeholder="Artist name"
                      onChange={updateState}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Song</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Song name"
                      onChange={updateState}
                      value={song}
                    />
                  </div>
                </div>
              </div>
              {error ? <Error message="All fields are required."/> : null}
              <button
                type="submit"
                className="btn btn-primary float-right"
              >Search
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;