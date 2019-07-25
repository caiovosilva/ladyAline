import React, { Component } from 'react';

export class PlaylistPlayer extends Component {
  static displayName = PlaylistPlayer.name;

  render () {
    return (
      <div>
        <iframe title="spotifyPlayer" frameBorder="0" allowtransparency="true" allow="encrypted-media" 
        src="https://open.spotify.com/embed/playlist/7bVqTuKmhV0JYaFvWMn4Ud?si=cb8GUtNhTqqoWFvxMcYT5Q" width="600" height="480" ></iframe>
      </div>
    );
  }
}
