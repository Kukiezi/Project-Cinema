import * as React from 'react';
import '../../assets/css/Spinner.css';
import { NavLink } from 'react-router-dom';

class DetailsPanel extends React.Component {

   state = {
    "movie": {
      "id": 0,
      "title": "",
      "description": "",
      "picture": "",
      "rating": 0
    }
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

   async componentDidMount() {
    const { Id } = this.props.match.params;
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetMovie?id=' + Id);
    const movie = await result.json();
  
    this.setState({
      movie
    });
  }

   onChange = (e) => {
    const movieCopy = JSON.parse(JSON.stringify(this.state.movie));
    movieCopy[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ movie: movieCopy});
}

 async updateMovie(){
   await fetch('https://localhost:44371/cinema/UpdateMovie?id=' + this.state.movie.id + '&title=' + this.state.movie.title + '&description=' + this.state.movie.description + '&picture=' + this.state.movie.picture, {
        method: 'POST'
      });
}

   render() {
    
    return (
       
        <div className="form-inner">
       
            <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Edytuj film</h1>
            <div className="add-movie">
                    <NavLink className="add-btn btn-style" to="/MovieManagment" >
                        &laquo; Powrót
                    </NavLink>
                </div>
                <div className="inline-block w-1/2 add-form">
                  <div className="add-form-item">
                      <label htmlFor="title" className="block text-sm font-bold ml-8 text-white">TYTUŁ</label>
                      <input onChange={this.onChange} placeholder="Podaj tytuł " defaultValue={this.state.movie.title} id="title" type="title" name="title" className="shadow appearance-none border rounded ml-8 mb-3 w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                  </div>   
                  <div className="add-form-item  ">
                        <label htmlFor="genre" className="block text-sm font-bold  ml-8 text-white">GATUNEK</label>
                        <input onChange={this.onChange} placeholder="Podaj gatunek "  id="genre" type="genre" name="genre" className="shadow appearance-none border rounded ml-8  w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item ">
                        <label htmlFor="director" className="block text-sm font-bold  ml-8 text-white">REŻYSER</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="director" type="director" name="director" className="shadow appearance-none border rounded ml-8 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>   

                <div className="inline-block w-1/2 add-form2">
                    <div className="add-form-item2">
                        <label htmlFor="ageRestriction" className="block text-sm font-bold  text-white">OGRANICZENIA WIEKOWE</label>
                        <input onChange={this.onChange} placeholder="Podaj ograniczenie "  id="ageRestriction" type="ageRestriction" name="ageRestriction" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className="add-form-item2 ">
                        <label htmlFor="watchingTime" className="block text-sm font-bold  text-white">CZAS OGLĄDANIA</label>
                        <input onChange={this.onChange} placeholder="Podaj czas oglądania "  id="watchingTime" type="watchingTime" name="watchingTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="text-center w-3/5 ml-auto mr-auto">    

                  <div className="add-form-item">
                      <label htmlFor="picture" className="block text-sm font-bold mb-2 text-white">ZDJĘCIE</label>
                      <input onChange={this.onChange} placeholder="Podaj link do zdjęcia " defaultValue={this.state.movie.picture} id="picture" type="picture" name="picture" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                  </div>

                  <div className="add-form-item">
                        <label htmlFor="icon" className="block text-sm font-bold  text-white">IKONA</label>
                        <input onChange={this.onChange} placeholder="Podaj link do ikony "  id="icon" type="icon" name="icon" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
              
                  <div className="add-form-item">
                      <label htmlFor="description" className="block text-sm font-bold mb-2 text-white">OPIS</label>
                      <input onChange={this.onChange}  placeholder="Opis.." defaultValue={this.state.movie.description} id="description" type="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                  </div>

                </div>

                  <div className="text-center pt-4">
                      <button onClick={this.updateMovie} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz zmiany</button>
                  </div>
                
         </div>
    );
  }
}

export default DetailsPanel;

