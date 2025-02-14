import React, { useState } from 'react'
import "./Footer.css"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Grid, Slider } from "@mui/material";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { useDataLayerValue } from './DataLayer';
import ErrorModal from './ErrorModal';

function Footer() {
  const [{ current_track, current_playlist, current_track_index }, dispatch] = useDataLayerValue();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Assuming 30 seconds for preview
  const [error, setError] = useState(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // Attempt to play
      setIsPlaying(true);
      setError("Playback is only available for Spotify Premium users.");
    }
  };

  const handleSeek = (event, newValue) => {
    setCurrentTime(newValue);
    // Note: actual seeking won't work without proper audio implementation
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const closeErrorModal = () => {
    setError(null);
  };

  const handlePrevious = () => {
    if (current_playlist && current_playlist.tracks.items.length > 0) {
      const newIndex = (current_track_index - 1 + current_playlist.tracks.items.length) % current_playlist.tracks.items.length;
      const newTrack = current_playlist.tracks.items[newIndex].track;
      dispatch({
        type: 'SET_CURRENT_TRACK',
        current_track: newTrack,
      });
      dispatch({
        type: 'SET_CURRENT_TRACK_INDEX',
        index: newIndex,
      });
    }
  };

  const handleNext = () => {
    if (current_playlist && current_playlist.tracks.items.length > 0) {
      const newIndex = (current_track_index + 1) % current_playlist.tracks.items.length;
      const newTrack = current_playlist.tracks.items[newIndex].track;
      dispatch({
        type: 'SET_CURRENT_TRACK',
        current_track: newTrack,
      });
      dispatch({
        type: 'SET_CURRENT_TRACK_INDEX',
        index: newIndex,
      });
    }
  };

  return (
    <>
      <div className='footer'>
        <div className='footer__left'>
          <img 
            className="footer__albumLogo" 
            src={current_track?.album.images[0].url || "https://via.placeholder.com/64"} 
            alt="Album cover"
          />
          <div className='footer__songInfo'>
            <h4>{current_track?.name || "No song selected"}</h4>
            <p>{current_track?.artists.map(artist => artist.name).join(", ") || "Unknown artist"}</p>
          </div>
        </div>

        <div className='footer__center'>
          <div className='footer__controls'>
            <ShuffleIcon className="footer__green" fontSize="small" />
            <SkipPreviousIcon className="footer__icon" onClick={handlePrevious} />
            {isPlaying ? (
              <PauseCircleIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="footer__icon"
              />
            ) : (
              <PlayCircleIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="footer__icon"
              />
            )}
            <SkipNextIcon className="footer__icon" onClick={handleNext} />
            <RepeatIcon className="footer__green" fontSize="small" />
          </div>
          <div className='footer__seekbar'>
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
              className="footer__slider"
              size="small"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className='footer__right'>
          <PlaylistPlayIcon className="footer__icon" />
          <div className="footer__volumeControl">
            <VolumeDownIcon className="footer__icon" />
            <Slider className="footer__volumeSlider" size="small" />
          </div>
        </div>
      </div>
      {error && <ErrorModal message={error} onClose={closeErrorModal} />}
    </>
  )
}

export default Footer
