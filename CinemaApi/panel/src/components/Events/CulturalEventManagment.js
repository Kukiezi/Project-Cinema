import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import ExportToExcel from './ExportToExcel';
import {Link } from 'react-router-dom';


export default class CulturalEventManagment extends React.Component{

 
    constructor(props) {
        super(props);
       
        this.state = {   
          culturalevents: []
        };
    }

     async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetCulturalEvents');
        const culturalevents = await result.json();
      
        this.setState({ culturalevents });        
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
              accessor: 'idCulturalEvent',      
              sortable: false,  
              width: 100,
                  maxWidth: 100,
                  minWidth: 100,
                  style: {
                    textAlign: "right"
                  }  ,  
              filterable: true,
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
              Header: 'Nazwa',             
                  accessor: 'eventName',
                  className: "font-medium tracking-normal",
                  filterable: true,
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
                Header: 'Data',
                accessor: 'eventDate',
                filterable: false,
                style: {
                    textAlign: "center"
                  },
              },
              {
                Header: 'Limit miejsc',
                accessor: 'seatsLimit',
                filterable: false,
                style: {
                    textAlign: "center"
                  },

              },
            {
              columns:[
                {
                  filterable: false,
                  Cell: ({ row }) => (<Link to={{ pathname: `/EventDetailsPanel/${row.id}` }} className="no-underline text-white">Edytuj</Link>),
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
                  Cell: ({ row }) => (<Link to={{ pathname: `/DeleteCulturalEvent/${row.id}` }} className="no-underline text-white">Usuń</Link>),
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
              <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Wydarzeń</h1>
              <div className="add-movie">
                    <NavLink className="add-btn btn-style absolute pin-l ml-2 mr-2" to="/AdminPanel" >
                    &laquo; Powrót
                    </NavLink>
                  <NavLink className="add-btn btn-style absolute pin-r ml-2 mr-2" to="/AddCulturalEvent" >
                      Dodaj wydarzenie
                  </NavLink>
              </div>
              <ReactTable
              data={this.state.culturalevents}
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
    }
    
}

