import React, { Component } from 'react';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import hash from "./Hash";
//import Player from "./Player";
import "./NowPlaying.css";
import { Button } from 'reactstrap';
import "./Player.css";

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
    this.handleNext = this.handleNext.bind(this);
    this.Player = this.Player.bind(this);
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

  handleNext (){
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/next",
      type: "POST",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + hash.access_token);
      },
      success: (data) => {
        this.getCurrentlyPlaying(hash.access_token);
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
            {this.Player()}
            <Button color="secondary" onClick={this.handlePlayPause}>Play/Pause</Button>
            <Button color="secondary" onClick={this.handleNext}>Próxima</Button>
            </div>
          )}           

        </header>
        <body>
        </body>
      </div>
    );
  }

  Player() {

    return (
      <div className="App">
        <div className="main-wrapper">
          <div className="now-playing__img">
            <img src={this.state.item.album.images[0].url} alt="album" />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{this.state.item.name}</div>
            <div className="now-playing__artist">
              {this.state.item.artists[0].name}
            </div>
            <div className="now-playing__status">
              {this.state.is_playing ? "Tocando" : "Pausado"}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}



export default NowPlaying;