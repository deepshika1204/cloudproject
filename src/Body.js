import React from 'react'
import "./Body.css"
import Header from './Header'
import { useDataLayerValue } from './DataLayer'
import PlaylistView from './PlaylistView'
import SearchResults from './SearchResults'
import Library from './Library'

function Body({ spotify }) {
  const [{ view }] = useDataLayerValue();

  return (
    <div className='body'>
      <Header spotify={spotify} />
      {view === 'search' 
        ? <SearchResults />
        : view === 'library'
          ? <Library />
          : <PlaylistView spotify={spotify} />
      }
    </div>
  )
}

export default Body
