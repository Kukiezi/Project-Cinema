import React from 'react';
// import Movies from './MoviesPanel'
import { NavLink } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import DetailsPanel from './DetailsPanel';
// import ExportToExcel from './ExportToExcel';
import {Link} from 'react-router-dom';

export default class MovieManagment extends React.Component{

 
    constructor(props) {
        super(props);
       
        this.state = {   
          movies: []
        };
    }

     async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetMovies');
        const movies = await result.json();
      
        this.setState({ movies });        
      }

      textFilter(filter, row){
        let result =parseInt( row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
        if(result < 0){
          return false;
        }else{
          return true;
        }
      } 
     render(){

        const columns = [
             {
              Header: 'ID',
              accessor: 'id',      
              sortable: true,
              filterable: true,
              filterMethod: (filter,row) => {return this.textFilter(filter,row)},
              Filter: ({filter, onChange}) => (
                <input
                  onChange={event => onChange(event.target.value)}
                  value={filter ? filter.value : ''}
                  style={{
                    width: '80%',
                    backgroundColor: '#dae1e7',
                    color: 'darkred',
                    textAlign: "center"
                  }}
                />
              ),  
              width: 100,
                  maxWidth: 100,
                  minWidth: 100,
                  style: {
                    textAlign: "right"
                  }       
            },
            {
              Header: 'Tytuł',             
                  accessor: 'title',
                  filterable: true,
                  filterMethod: (filter,row) => {return this.textFilter(filter,row)},
                  className: "font-medium tracking-normal",
                  style: {
                    textAlign: "center"
                  },
                  Filter: ({filter, onChange}) => (
                    <input
                      onChange={event => onChange(event.target.value)}
                      value={filter ? filter.value : ''}
                      style={{
                        width: '80%',
                        backgroundColor: '#dae1e7',
                        color: 'darkred',
                        textAlign: "center"
                      }}
                    />
                  ),  
            },
            {
                Header: 'Opis',
                accessor: 'description',
                sortable: false,
                filterable: false,

              },
            {
              columns:[
                {
                  filterable: false,
                  Cell: ({ row }) => (<Link to={{ pathname: `/DetailsPanel/${row.id}` }} className="no-underline text-white">Edytuj</Link>),
                
                  sortable: false,
                  width: 100,
                  maxWidth: 100,
                  minWidth: 100,
                  style: {
                    textAlign: "center"
                  },
                  className: "bg-red-dark hover:bg-red-darker text-white py-1 px-1 mt-1 mb-1 mr-2 ml-2 rounded text-sm"
                },
                {
                  filterable: false,
                  Cell: ({ row }) => (<Link to={{ pathname: `/DeleteMovie/${row.id}` }} className="no-underline text-white">Usuń</Link>),
                  sortable: false,
                  width: 100,
                  maxWidth: 100,
                  minWidth: 100,
                  style: {
                    textAlign: "center"
                  },
                  className: "bg-red-dark hover:bg-red-darker text-white py-1 px-1 mt-1 mb-1 mr-2 ml-2 rounded text-sm"
                },
              ]
            }
        ]
        return (

            <div>
              <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Filmów</h1>
              <div className="add-movie">
                    <NavLink className="add-btn btn-style absolute pin-l ml-2 mr-2" to="/AdminPanel" >
                    &laquo; Powrót
                    </NavLink>
                  <NavLink className="add-btn btn-style absolute pin-r ml-2 mr-2" to="/AddMovie" >
                      Dodaj film
                  </NavLink>
              </div>
              <ReactTable
              data={this.state.movies}
              columns={columns}
              noDataText="No Data Available"
              filterable
              defaultPageSize={5}
              className="react-table -striped -highlight text-grey-lighter bg-grey-darkest mt-24" 
              />
              

              {/* {(state, filtredData, instance) => {
                this.reactTable = state.pageRows.map(movie => { return movie._original });
                return(
                  <div>
                    {filtredData()}
                    <ExportToExcel movies={this.reactTable} />
                  </div>
                )
              }} */}

              
            </div>
            
           
          );

          
        
        // return(
        //     <div>
        //         <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Filmów</h1>

        //         {/* <h2 className="text-white font-monte">Lista filmów:</h2> */}
        //         <div className="add-movie">
        //             <NavLink className="add-btn btn-style" to="/AdminPanel" >
        //             &laquo; Powrót
        //             </NavLink>
        //             <NavLink className="add-btn btn-style" to="/AddMovie" >
        //                 Dodaj film
        //             </NavLink>
        //         </div>
              
                
        //         <div className="Movie-list" id="Movie-list"> 
        //             <table>
        //                 <tr>
        //                     <th/>
        //                     <th>Tytuł</th>
        //                     <th>Zarządzaj</th>
        //                 </tr>
        //                 <tr>
        //                     <td>{this.state.movies.map(movie => 
        //                      <Movies key={movie.id} movie={movie}/>)}</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Edytuj | Usuń</td>
        //                 </tr>
        //            {/* {this.state.movies.map(movie => 
        //                      <Movies key={movie.id} movie={movie}/>)} */}
        //             </table>
        //         </div>

        //     </div>
        
        // )


        
    }
    
}

