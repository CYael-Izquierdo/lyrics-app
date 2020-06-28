import React from "react";
import ShowMoreText from 'react-show-more-text';

const Info = ({info}) => {
  if (Object.keys(info).length === 0) return null;

  const {strArtist, strArtistThumb, strGenre, strBiographyEN} = info;

  return (
    <div className="card border-light">
      <div className="card-header bg-primary text-light font-weight-bold">
        {`${strArtist} information`}
      </div>
      <div className="card-body">
        <img src={strArtistThumb} alt="Artist"/>
        <p className="card-text">Genre: {strGenre}</p>
        <h2 className="card-text">Biography</h2>
        <ShowMoreText
          lines={10}
          more='Show more'
          less='Show less'
          expanded={false}
        >
          <p className="card-text">{strBiographyEN}</p>
        </ShowMoreText>
        <p className="card-text">
          <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href={`${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-lastfm"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Info

