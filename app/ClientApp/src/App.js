import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PlaylistPlayer } from './components/PlaylistPlayer';
import { FavoriteArtists } from './components/FavoriteArtists'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/playlist-player' component={PlaylistPlayer} />
        <Route path='/favorites-artists' component={FavoriteArtists} />
      </Layout>
    );
  }
}