const { Pool } = require('pg');
 
class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylistSongs(id) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      LEFT JOIN playlistsongs ON songs.id = playlistsongs.song_id
      WHERE playlistsongs.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = PlaylistSongsService;