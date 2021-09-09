const { Pool } = require('pg');
 
class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylistSongs(id) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer 
      FROM songs
      JOIN playlistsongs ON songs.id = playlistsongs.song_id 
      JOIN playlists ON playlistsongs.playlist_id = playlists.id 
      WHERE playlists.id = $1
      GROUP BY songs.id`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = PlaylistSongsService;