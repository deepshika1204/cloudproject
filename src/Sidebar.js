import React from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from './DataLayer';

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const handleHomeClick = () => {
    dispatch({
      type: 'SET_VIEW',
      view: 'home'
    });
    dispatch({
      type: 'SET_SELECTED_PLAYLIST',
      playlist: null
    });
  };

  const handleSearchClick = () => {
    dispatch({
      type: 'SET_VIEW',
      view: 'search'
    });
  };

  const handleLibraryClick = () => {
    dispatch({
      type: 'SET_VIEW',
      view: 'library'
    });
  };

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
    <div className='sidebar'>
      <img 
        className='sidebar__logo'
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" 
        alt="" 
      />
      <SidebarOption Icon={HomeIcon} title="Home" onClick={handleHomeClick} />
      <SidebarOption Icon={SearchIcon} title="Search" onClick={handleSearchClick} />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" onClick={handleLibraryClick} />
      
      <br />
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr />

      <div className="sidebar__playlists">
        {playlists?.items?.map(playlist => (
          <SidebarOption 
            key={playlist.id} 
            title={playlist.name} 
            onClick={() => handlePlaylistClick(playlist)}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
