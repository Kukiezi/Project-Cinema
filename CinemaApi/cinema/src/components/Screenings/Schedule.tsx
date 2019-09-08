import * as React from 'react';
import Screening from './Screening';
import './Screening.css';
import Fade from '../App/Fade';
// import Movies from '../Movies/Movies';
// import { NavLink } from 'react-router-dom';
import '../Users/UserProfil.css';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import './Screening.css';

class MovieSchedule extends React.Component<any, any>{

  // public state: IState = {
  //     "screenings": {
  //     "day1": [], 
  //     "day2": []
  //     },
  //     "movies": []
  // };

  constructor(props: any) {
    super(props);

    this.state = {
      screenings: {
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: []
      },
      movie: {
        "id": 0,
        "title": "",
        "description": "",
        "picture": "",
        "rating": 0
      },
      imgSrc: "",
      movies:
      {
        fileName: "",
        src: ""
      },
      refresh: 0,
      id: this.props.match.params.Id
    }

  }

  public async componentDidMount() {
    // console.log(this.state.id)
    const result = await fetch('https://localhost:44371/cinema/GetScreeningMovie?id=' + this.state.id);
    const screenings = await result.json();
    this.setState({ screenings });
    const result2 = await fetch('https://localhost:44371/cinema/GetMovie?id=' + this.state.id);
    const movie = await result2.json();
    await this.setState({ movie });
    // // console.log(this.state.screenings.day1[0]);
    const movies = this.state.movie;
    const movieIconProps = this.state.movie.picture
    const req = require.context("../../assets/images", false, /.*\.(jpg|png)$/);
    for (const key of req.keys()) {
      movies.fileName = key.substring(2);
      if (movies.fileName === movieIconProps) {
        movies.src = req(key);
        this.setState({ movies })
      }
    }
  }


  public render() {
    return (

      <div className="App">

        <Fade>
          <p className="p-8 List-header">
            Repetuar
            </p>
        </Fade>
        <div className="w-full mb-12">
          <Fade>

            <Tabs>
              <TabList className='day-navbar text-white mt-16'>
                <Tab>Dzisiaj</Tab>
                <Tab>Jutro</Tab>
                <Tab>Czwartek</Tab>
                <Tab>Piątek</Tab>
                <Tab>Sobota</Tab>
              </TabList>

              <TabPanel className="all-screenings">

                {this.state.screenings.day1.map(day => <Screening key={day.idScreening} screening={day} />)}


              </TabPanel>
              <TabPanel className="all-screenings">


                {this.state.screenings.day2.map(day => <Screening key={day.idScreening} screening={day} />)}

              </TabPanel>
              <TabPanel className="all-screenings">

                {this.state.screenings.day3.map(day => <Screening key={day.idScreening} screening={day} />)}

              </TabPanel>
              <TabPanel className="all-screenings">

                {this.state.screenings.day4.map(day => <Screening key={day.idScreening} screening={day} />)}

              </TabPanel>
              <TabPanel className="all-screenings">

                {this.state.screenings.day5.map(day => <Screening key={day.idScreening} screening={day} />)}

              </TabPanel>
              <TabPanel className="all-screenings">

                {this.state.screenings.day6.map(day => <Screening key={day.idScreening} screening={day} />)}

              </TabPanel>

            </Tabs>
          </Fade>
        </div>

        <Fade>
          <img src={this.state.movies.src} width="60%" />

        </Fade>





        {/* {/* <div className="Day-header">
          <br/><NavLink className="title-btn" to="/Details/1" >Garfield</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/2" >Iniemamocni</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/3" >Robin Hood</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/4" >Kraina Lodu</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/5" >Ted 2</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/8" >Avatar</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          </div> */}
      </div>
    );
  }

}
export default MovieSchedule;