import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { NowPlaying } from './components/NowPlaying';
import { PlaylistPlayer } from './components/PlaylistPlayer';
import { FavoriteArtists } from './components/FavoriteArtists'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={NowPlaying} />
        <Route path='/playlist-player' component={PlaylistPlayer} />
        <Route path='/favorites-artists' component={FavoriteArtists} />
      </Layout>
    );
  }
}