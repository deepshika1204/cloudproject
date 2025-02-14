export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    discover_weekly: null,
    current_track: null,
    current_playlist: null,
    current_track_index: 0,
    selected_playlist: null,
    view: 'home',
    searchResults: [],
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        case 'SET_CURRENT_TRACK':
            return {
                ...state,
                current_track: action.current_track,
            };
        case 'SET_CURRENT_PLAYLIST':
            return {
                ...state,
                current_playlist: action.playlist,
            };
        case 'SET_CURRENT_TRACK_INDEX':
            return {
                ...state,
                current_track_index: action.index,
            };
        case 'SET_SELECTED_PLAYLIST':
            return {
                ...state,
                selected_playlist: action.playlist,
            };
        case 'SET_VIEW':
            return {
                ...state,
                view: action.view
            };
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.searchResults
            };
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
};

export default reducer;

