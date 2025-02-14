import React from 'react'
import "./Library.css"
import { useDataLayerValue } from './DataLayer'

function Library() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const handlePlaylistClick = (playlist) => {
    dispatch({
      type: 'SET_SELECTED_PLAYLIST',
      playlist: playlist,
    });
    dispatch({
      type: 'SET_VIEW',
      view: 'playlist'
    });
  };

  return (
    <div className="library">
      <h2>Your Library</h2>
      <div className="library__playlists">
        {playlists?.items?.map(playlist => (
          <div 
            key={playlist.id} 
            className="library__playlist"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <img src={playlist.images[0]?.url} alt={playlist.name} />
            <div className="library__playlistInfo">
              <h4>{playlist.name}</h4>
              <p>{playlist.owner.display_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Library
