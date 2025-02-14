import React, { useEffect, useState } from 'react'
import "./PlaylistView.css"
import { useDataLayerValue } from './DataLayer'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';

function PlaylistView({ spotify }) {
  const [{ discover_weekly, selected_playlist }, dispatch] = useDataLayerValue();
  const [playlistToShow, setPlaylistToShow] = useState(null);

  useEffect(() => {
    if (selected_playlist) {
      spotify.getPlaylist(selected_playlist.id).then(response => {
        setPlaylistToShow(response);
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          playlist: response,
        });
      });
    } else {
      setPlaylistToShow(discover_weekly);
      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        playlist: discover_weekly,
      });
    }
  }, [selected_playlist, discover_weekly, spotify, dispatch]);

  const playTrack = (track, index) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: track,
    });
    dispatch({
      type: "SET_CURRENT_TRACK_INDEX",
      index: index,
    });
  };

  return (
    <div className='playlist-view'>
      {playlistToShow && (
        <>
          <div className='playlist-view__info'>
            <img src={playlistToShow.images[0]?.url} alt="" />
            <div className="playlist-view__infoText">
              <strong>PLAYLIST</strong>
              <h2>{playlistToShow.name}</h2>
              <p>{playlistToShow.description}</p>
            </div>
          </div>

          <div className='playlist-view__songs'>
            <div className='playlist-view__icons'>
              <PlayCircleFilledIcon className='playlist-view__shuffle' />
              <FavoriteIcon fontSize='large' />
              <MoreHorizIcon />
            </div>

            {playlistToShow.tracks?.items.map((item, index) => (
              <SongRow 
                key={item.track.id} 
                track={item.track} 
                playTrack={() => playTrack(item.track, index)} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PlaylistView
