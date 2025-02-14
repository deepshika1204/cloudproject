import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material'
import { useDataLayerValue } from './DataLayer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header({ spotify }) {
  const [{ user, searchResults }, dispatch] = useDataLayerValue();
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!searchInput) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        searchResults: []
      });
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      spotify.search(searchInput, ['track', 'artist'], { limit: 10 })
        .then(res => {
          dispatch({
            type: "SET_SEARCH_RESULTS",
            searchResults: res.tracks.items
          });
        })
        .catch(err => console.error('Search error:', err));
    }, 300);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearTimeout(delayDebounceFn);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInput, spotify, dispatch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    dispatch({
      type: "SET_VIEW",
      view: e.target.value ? "search" : "home"
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfile = () => {
    // Implement profile view logic here
    console.log("View profile");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear all app state
    dispatch({ type: 'RESET_STATE' });
    
    // Clear token from localStorage
    localStorage.removeItem('spotify_token');
    
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts"
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <div className='header__right' onClick={toggleDropdown} ref={dropdownRef}>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
        <ArrowDropDownIcon />
        {isDropdownOpen && (
          <div className="header__dropdown">
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
