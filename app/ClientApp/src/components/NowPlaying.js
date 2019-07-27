import React, { Component } from 'react';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import hash from "./Hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./NowPlaying.css";

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
      is_playing: "Paused",
    };
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

  getLastPlayed(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/recently-played",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader("Access-Control-Allow-Headers",
          "Access-Control-Allow-Headers, 
          Origin, 
          Accept, 
          X-Requested-With, 
          Content-Type, 
          Access-Control-Request-Method, 
          Access-Control-Request-Headers, 
          Authorization")
        xhr.setRequestHeader("Authorization", "Bearer " + hash.access_token);
        xhr.setRequestHeader("limit", "1");
      },
      success: (data) => {
        console.log("data", data);
        // if(data!==undefined){
        //   this.setState({
        //     item: data.item,
        //     is_playing: data.is_playing,
        //   });
        // }
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
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--login App-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              token={this.state.token}
            />
          )}
        </header>
      </div>
    );
  }
}

export default NowPlaying;