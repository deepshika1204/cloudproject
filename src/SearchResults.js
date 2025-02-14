import React from 'react'
import "./SearchResults.css"
import { useDataLayerValue } from './DataLayer'
import SongRow from './SongRow'

function SearchResults() {
  const [{ searchResults }, dispatch] = useDataLayerValue();

  const playTrack = (track) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: track,
    });
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="search-results__songs">
        {searchResults.map((track) => (
          <SongRow key={track.id} track={track} playTrack={() => playTrack(track)} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
