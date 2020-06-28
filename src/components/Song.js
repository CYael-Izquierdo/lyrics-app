import React, {Fragment} from "react";

const Song = ({song, lyrics}) => {
  if (lyrics === "") return null;
  return (
    <Fragment>
      <h2>{song.toUpperCase()}</h2>
      <p className="lyrics">{lyrics}</p>
    </Fragment>
  );
}


export default Song;