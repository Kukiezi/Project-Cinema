import React, {Component} from 'react';
import ReactHtmlTableToExcel from 'react-table-to-excel';

export default class ExportToExcel extends Component{
    render(){
        return(
            <div>
                <ReactHtmlTableToExcel
                    className="export"
                    table="table-to-xls"
                    filename="filtredData"
                    sheet="tablexls"
                    buttonText="Export"/>
                    <table hidden="true" id="table-to-xls">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.movies.map(movie => {
                                return(
                                    <tr key={movie.id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.description}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        )
    }
}
