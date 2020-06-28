import React, {Fragment, useState, useEffect} from 'react';
import Axios from "axios";
import Form from "./components/Form";
import Song from "./components/Song";
import Info from "./components/Info";
import Error from "./components/Error";
import ScaleLoader from "react-spinners/ScaleLoader"

function App() {
  const [lyricSearch, setLyricSearch] = useState({});
  const [lyrics, setLyrics] = useState("");
  const [information, setInformation] = useState({});
  const [getLyricsError, setGetLyricsError] = useState(false);
  const [getInfoError, setGetInfoError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(lyricSearch).length === 0) return;

    const getData = async () => {
      const {artist, song} = lyricSearch;
      const urlLyrics = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const urlArtist = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`

      await Promise.all([
        await Axios.get(urlLyrics).then(
          response => {
            setGetLyricsError(false);
            setLyrics(response.data.lyrics)
          }
        ).catch((error) => {
          setLyrics("")
          setGetLyricsError(true);
        }),
        await Axios.get(urlArtist).then(
          response => {
            setGetInfoError(false);
            if (response.data.artists !== null) {
              setInformation(response.data.artists[0]);
            } else {
              setInformation({});
              setGetInfoError(true);
            }
          }
        ).catch(
          error => {
            setInformation({});
            setGetInfoError(true);
          }
        )
      ])
    }
    setLoading(true);
    getData().then(() => setLoading(false));
  }, [lyricSearch]);

  return (
    <Fragment>
      <Form
        setLyricSearch={setLyricSearch}
      />
      <div className="container mt-5">
        {loading ?
          <div className="row justify-content-center">
            <ScaleLoader
              color="#EB6864"
              height={70}
              width={8}
            />
          </div>
          :
          <div className="row">
            <div className="col-md-6">
              {
                getInfoError ? <Error message={`No information found about ${lyricSearch.artist}.`}/> :
                  <Info
                    info={information}
                  />
              }
            </div>
            <div className="col-md-6">
              {
                getLyricsError ? <Error message={`${lyricSearch.song} lyrics not found.`}/> :
                  <Song
                    song={lyricSearch.song}
                    lyrics={lyrics}
                  />
              }
            </div>
          </div>
        }
      </div>
    </Fragment>
  );
}

export default App;
