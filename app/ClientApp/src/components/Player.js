import React from "react";
import "./Player.css";
import axios from 'axios';

const Player = props => {
  const backgroundStyles = {
    backgroundImage:`url(${props.item.album.images[0].url})`,
  };  

  function pause() {
    console.log('clicou no pause')
    axios.put('https://api.spotify.com/v1/me/player/play', props.token).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} alt="album" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="is-playing">
            <svg className="button" viewBox="0 0 60 60" onClick={pause}>
              <polygon points="0,0 15,0 15,60 0,60" />
              <polygon points="25,0 40,0 40,60 25,60" />
            </svg>
            { /*{this.state.playing? <Pause onPlayerClick={this.handlePlayerClick} /> : <Play onPlayerClick={this.handlePlayerClick} />} */}
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}

export default Player;