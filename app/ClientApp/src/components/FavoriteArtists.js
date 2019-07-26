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
      newArtistName: '',
      editArtistModal: false,
      editArtistData: {
        id:0,
        name:''
      }
    };
    this.fillTable();
  }

  fillTable(){
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
                <Button color='success' className='mr-2' onClick={this.toggleEditFavoriteArtistModal.bind(this, artist.id, artist.name)}>Editar</Button>
                <Button color="danger" onClick={this.deleteArtist.bind(this, artist.id)}>Excluir</Button>
              </td>
            </tr>
            )}
          </tbody>
        </Table>
      </div> 
    );
  }

  deleteArtist(id){
    axios.delete('api/FavoriteArtists/'+id).then((response) => {
      this.fillTable();
    })
  }

  editArtist() {
    return (
      <div>
      <Modal isOpen={this.state.editArtistModal} toggle={this.toggleEditFavoriteArtistModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditFavoriteArtistModal.bind(this)}>Editar Artista Favorito</ModalHeader>
        <ModalBody>
          <Input value={this.state.editArtistData.name} onChange={(e) => {
            let editArtistData = this.state;
            editArtistData.name = e.target.value;
            this.setState({editArtistData});
          }}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateArtist.bind(this)}>Salvar</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditFavoriteArtistModal.bind(this)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }

  toggleNewFavoriteArtistModal() {
    this.setState({
      newArtistModal: !this.state.newArtistModal
    });
  }

  toggleEditFavoriteArtistModal(id, name) {
    if(name!==undefined){
      let editArtistData = this.state;
      editArtistData.name = name;
      editArtistData.id = id;
      this.setState({editArtistData});
    }
    this.setState({
      editArtistModal: !this.state.editArtistModal
    });
  }

  renderNewArtistsModal(){
    return (
      <div>
      <Button color="primary" onClick={this.toggleNewFavoriteArtistModal.bind(this)}>Adicionar Novo Artista Favorito</Button>
      <Modal isOpen={this.state.newArtistModal} toggle={this.toggleNewFavoriteArtistModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewFavoriteArtistModal.bind(this)}>Artista Favorito</ModalHeader>
        <ModalBody>
          <Input placeholder="Nome do Artista" value={this.state.newArtistName} onChange={(e) => {
            let newArtistName = this.state.newArtistName;
            newArtistName = e.target.value;
            this.setState({newArtistName: newArtistName});
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
      name: this.state.newArtistName
    };
    axios.post('api/FavoriteArtists', artist).then((response) => {
      let { artists } = this.state;
      artists.push(response.data);
      this.setState({
        artists,
        newArtistModal:false,
        newArtistName:''
      });
    });
  }

  updateArtist(){
    
    const artist = {
      id: this.state.editArtistData.id,
      name: this.state.editArtistData.name
    };
    axios.put('api/FavoriteArtists/'+this.state.editArtistData.id, artist).then((response) => {
      //nao eh o ideal, se tiver tempo eu vejo como atualizar apenas um item da lista
      this.fillTable();
      this.setState({
        editArtistModal: false,
        editArtistData: {
          id: 0,
          name:''
        }
      });
    });
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderArtistsTable();
    let newArtmodal = this.renderNewArtistsModal();
    let editArtistModal = this.editArtist();
    return (
      <div>
        <h1>Aqui está a lista de seus artistas favoritos!</h1>
        {editArtistModal}
        {newArtmodal}
        {contents}
      </div>
    );
  }
}
