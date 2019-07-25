import React, { Component } from 'react';

export class FavoriteArtists extends Component {
  static displayName = FavoriteArtists.name;

  constructor (props) {
    super(props);
    this.state = { artists: [], loading: true };

    fetch('api/FavoriteArtists')
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data, loading: false });
      });
  }

  static renderArtistsTable (artists) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {artists.map(artist =>
            <tr key={artist.id}>
              <td>{artist.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FavoriteArtists.renderArtistsTable(this.state.artists);

    return (
      <div>
        <h1>Weather artist</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
