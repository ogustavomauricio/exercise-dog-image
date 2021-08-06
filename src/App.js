import React, { Component } from 'react';

import './App.css';
let favoritos= JSON.parse(localStorage.getItem('favorito')) || [];

export default class App extends Component {
  constructor(){
    super()


    this.state ={
      url:'',
      status: 'loading'
    }

  }
componentDidMount(){
  this.getImage()
  
}

 getImage = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response =>{ response.json().then((data) => {
    
    if (data.message.includes('terrier')) {
      return this.setState({
        url:'',
        status:'loaded',
      })
    }

    this.setState({
     url:data.message,
     status: 'loaded'
   })
  })
 })  
}


// Salva nos Favoritos
salveFavorito = () => {
  const { url } = this.state;
  favoritos.push(url)
  localStorage.setItem('favorito', JSON.stringify(favoritos))
}
// Exclui dos Favoritos

excluiFavoritos = () => {
  const { url } = this.state;
  
  const index = localStorage.getItem('favorito').indexof(url);
  
  if (index != -1) {
    favoritos.splice(index, 1)
  }
  
}
  render() {
    const { url, status } = this.state
    const carregando = <span>Carregando...</span>
    
    if (status === 'loading') {
      return carregando
    } 
    return(
      <div>
        <img classNAme = 'dog'src={ url } alt='Dog'/>
        <div class>
          <button onClick={ this.getImage }>Novo DOG</button>
          <button onClick={ this.salveFavorito }>Favorito</button>
          <button onClick={ this.excluiFavoritos }>Excluir</button>
        </div>
      </div>
    )
  }
}

