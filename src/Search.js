import React, { useState, useEffect } from 'react';
import { useDataLayerValue } from './DataLayer';
import './Search.css';
import SongRow from './SongRow';

function Search({ spotify }) {
  const [{ }, dispatch] = useDataLayerValue();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) return setSearchResults([]);

    const delayDebounceFn = setTimeout(() => {
      spotify.search(searchTerm, ['track', 'artist'], { limit: 10 })
        .then(res => {
          setSearchResults(res.tracks.items);
        })
        .catch(err => console.error('Search error:', err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, spotify]);

  const playTrack = (track) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: track,
    });
  };

  return (
    <div className="search">
      <div className="search__input">
        <input 
          type="text" 
          placeholder="Search for Artists, Songs, or Podcasts" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="search__results">
        {searchResults.map((track) => (
          <SongRow key={track.id} track={track} playTrack={() => playTrack(track)} />
        ))}
      </div>
    </div>
  );
}

export default Search;
