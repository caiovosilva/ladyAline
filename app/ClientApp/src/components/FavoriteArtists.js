import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
//import FavoriteArtist from ''
export class FavoriteArtists extends Component {
  static displayName = FavoriteArtists.name;

  constructor (props) {
    super(props);
    this.state = { 
      artists: [],
      loading: true,
      newArtistModal: false,
      newArtistData: {
        name: ''
      }
    };

    fetch('api/FavoriteArtists')
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data, loading: false });
      });
  }

  renderArtistsTable () {
    return (
      <div className='App container'>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {this.state.artists.map(artist =>
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>
                <Button color='success' className='mr-2'>Editar</Button>
                <Button color="danger">Excluir</Button>
              </td>
            </tr>
            )}
          </tbody>
        </Table>
      </div> 
    );
  }

  toggleNewFavoriteArtistModal() {
    this.setState({
      newArtistModal: !this.state.newArtistModal
    });
  }

  renderArtistsModal(){
    return (
      <div>
      <Button color="primary" onClick={this.toggleNewFavoriteArtistModal.bind(this)}>Adicionar Novo Artista Favorito</Button>
      <Modal isOpen={this.state.newArtistModal} toggle={this.toggleNewFavoriteArtistModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewFavoriteArtistModal.bind(this)}>Adicionar Novo Artista Favorito</ModalHeader>
        <ModalBody>
          <Input placeholder="Nome do Artista" value={this.state.newArtistData.name} onChange={(e) => {
            let newArtistData = this.state;
            newArtistData.name = e.target.value;
            this.setState({newArtistData});
          }}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addArtist.bind(this)}>Salvar</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewFavoriteArtistModal.bind(this)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }

  addArtist(){
    const artist = {
      name: this.state.newArtistData.name
    };
    axios.post('api/FavoriteArtists', {artist}).then((response) => {
      console.log(response.data);
    });
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderArtistsTable();
    let modal = this.renderArtistsModal();
    return (
      <div>
        <h1>Aqui está a lista de seus artistas favoritos!</h1>
        {modal}
        {contents}
      </div>
    );
  }
}
