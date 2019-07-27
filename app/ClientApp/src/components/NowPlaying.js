import React, { Component } from 'react';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import hash from "./Hash";
import Player from "./Player";
import "./NowPlaying.css";
import { Button } from 'reactstrap';



export class NowPlaying extends Component {
  static displayName = NowPlaying.name;

  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
      },
      is_playing: false,
    };
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount() {
    // inicializando o  token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  handlePlayPause (){
    let url = null;
    if (this.state.is_playing)
      url = "https://api.spotify.com/v1/me/player/pause";
    else 
      url = "https://api.spotify.com/v1/me/player/play";
    
    $.ajax({
      url: url,
      type: "PUT",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + hash.access_token);
      },
      success: (data) => {
        this.setState({is_playing: !this.state.is_playing})
      }
    });  
  }

  getLastPlayed(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/recently-played",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + hash.access_token);
      },
      success: (data) => {
        if(data!==undefined){
          this.setState({
            item: data.items[0].track,
            is_playing: data.is_playing,
          });
        }
      }
    });
  }

  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if(data!==undefined){
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
          });
        }
        else {
          this.getLastPlayed();
        }
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--login App-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login com Spotify
            </a>
          )}
          {(this.state.token) && (
            <div>
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
            />
            <Button className="play-pause"color="secondary" onClick={this.handlePlayPause}>Play/Pause</Button>
            </div>
          )}           

        </header>
        <body>
        </body>
      </div>
    );
  }
}

export default NowPlaying;