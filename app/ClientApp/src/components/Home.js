import React, { Component } from 'react';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import hash from "./Hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./Home.css";

export class Home extends Component {
  static displayName = Home.name;

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
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
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

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        if(data!==undefined){
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms,
          });
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
              progress_ms={this.progress_ms}
            />
          )}
        </header>
      </div>
    );
  }
}

export default Home;