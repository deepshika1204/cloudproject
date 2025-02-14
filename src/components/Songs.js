import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import SongRow from "./SongRow";

function Songs() {
  const playlist = useRecoilValue(playlistState);

  if (!playlist || !playlist.tracks) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist.tracks.items.map((track, i) => (
        <SongRow key={track.track.id} track={track.track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
