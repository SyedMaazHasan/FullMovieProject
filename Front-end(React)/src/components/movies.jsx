import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Like from "./like";
import { getGenres } from "./../services/fakeGenreService";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Search from "./search";
import axios from "axios";
import { apiEndPoint } from "../config.json";
import getMovies from "./../services/movieService";
const token = localStorage.getItem("token");

class Movies extends Component {
  state = {
    movies: [],
    pagesize: 4,
    currentPage: 1,
    heart: "fa fa-heart-o",
    //genres: ["action", "thriller", "comedy"]
    genres: getGenres(),
    allmovies: []
  };
  async componentWillMount() {
    const { data } = await getMovies();

    this.setState({ movies: data });
    this.setState({ allmovies: data });
  }
  handleDelete = async m => {
    let temp = JSON.parse(JSON.stringify(this.state.movies));
    try {
      //updating frontend
      if (token) {
        //let temp = { ...this.state.movies };      //wont work... shallow copy

        const result = temp.filter(t => t._id !== m._id);
        //this.setState({ movies: result });            //this will also work
        //this.setState(state => { state.movies = result; });     //wont work

        this.setState(state => ({ movies: result }));
        //updating backend
      } else {
        toast.error("Please login to delete", { autoClose: 1500 });
        return 0;
      }
      console.log("movie to be deleted=", m);
      const res = await axios.post(apiEndPoint + "/movies/delete", m);
      toast.success("deleted successfully");
    } catch (ex) {
      //revert the state
      console.log("error occourred");
      this.setState({ movies: temp });
      toast.error("error occourred because api end point is not correct");
      ///window.location = "/movies";
    }
  };
  //calculate total no of pages
  //create an array in paginate component
  arrayOfPages = () => {
    let totlPages = Math.ceil(this.state.movies.length / this.state.pagesize);
    //console.log(totlPages);
    let a = [];
    for (let i = 0; i < totlPages; i++) {
      a[i] = i + 1;
    }
    return a;
  };
  clicked = currentPage => {
    this.setState({ currentPage });
    //console.log("clickedhhaha");
  };
  prevPageClick = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };
  nextPageClick = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  sort = (currentpagerecords, type) => {
    let sorted = this.state.movies;
    if (type === "title") {
      sorted = this.state.movies.sort((a, b) => {
        if (a.Title > b.Title) return 1;
        if (a.Title < b.Title) return -1;
      });
    }

    if (type === "genere") {
      sorted = this.state.movies.sort((a, b) => {
        if (a.Genre > b.Genre) return 1;
        if (a.Genre < b.Genre) return -1;
      });
    }
    if (type === "stock") {
      sorted = this.state.movies.sort((a, b) => {
        if (a.NumberInStock > b.NumberInStock) return 1;
        if (a.NumberInStock < b.NumberInStock) return -1;
      });
    }
    if (type === "rate") {
      sorted = this.state.movies.sort((a, b) => {
        if (a.DailyRentalRate > b.DailyRentalRate) return 1;
        if (a.DailyRentalRate < b.DailyRentalRate) return -1;
      });
    }
    console.log("sorted=", sorted);
    this.setState({ movies: sorted });
  };
  changeHeart = () => {
    if (this.state.heart === "fa fa-heart-o") {
      this.setState({ heart: "fa fa-heart" });
    } else {
      return "fa fa-heart-o";
    }
  };
  reset = () => {
    const data = this.state.allmovies;

    this.setState({ movies: data });
  };
  filterGenere = genere => {
    const data = this.state.allmovies;
    if (genere === "all") {
      this.setState({ movies: data });
    }
    if (genere === "Action") {
      const result = data.filter(g => {
        return g.Genre === "action";
      });
      this.setState({ movies: result, currentPage: 1 });
    }
    if (genere === "Thriller") {
      const result = data.filter(g => {
        return g.Genre === "thriller";
      });
      this.setState({ movies: result, currentPage: 1 });
    }
    if (genere === "Comedy") {
      const result = data.filter(g => {
        return g.Genre === "comedy";
      });
      this.setState({ movies: result, currentPage: 1 });
    }
  };
  search = e => {
    const temp = e.currentTarget.value;
    console.log(temp);
    const result = this.state.allmovies.filter(f => {
      return f.Title.toLowerCase().startsWith(temp.toLowerCase());
    });

    this.setState({ movies: result });
  };
  buttonclicked = () => {
    if (token) {
      this.props.history.push("/NewMovie");
    } else {
      setTimeout(() => {
        this.props.history.push("/LoginForm");
      }, 2000);
      toast.error("Please login to continue", { autoClose: 1500 });
    }
  };
  render() {
    //console.log(this.state.movies.length);
    const PageArray = this.arrayOfPages();
    //console.log(PageArray);
    const currentpagerecords = this.state.movies.slice(
      this.state.currentPage * this.state.pagesize - 4,
      this.state.currentPage * this.state.pagesize
    );

    return (
      <React.Fragment>
        <ToastContainer />
        <div class="container">
          <h1>showing total {this.state.movies.length} movies</h1>
          <button
            type="button"
            className="btn btn-info btn-md active"
            margin-right="16px"
            onClick={this.reset}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-outline-success my-2 my-sm-0 pull-right"
            margin-right="16px"
            onClick={() => this.buttonclicked()}
          >
            Add Movie
          </button>

          <div class="row">
            <div class="col-sm-3">
              <div className="list-group ">
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  onClick={() => this.filterGenere("all")}
                >
                  All Genere
                </a>
                {this.state.genres.map(g => (
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                    onClick={() => this.filterGenere(g.name)}
                  >
                    {g.name}
                  </a>
                ))}
              </div>
            </div>

            <div class="col-sm-6">
              <div class="col-sm-8">
                <Search onChange={this.search} />
              </div>

              <table className="table table-hover ">
                <thead>
                  <tr>
                    <th scope="col">
                      <a onClick={() => this.sort(currentpagerecords, "title")}>
                        Title
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        onClick={() => this.sort(currentpagerecords, "genere")}
                      >
                        Genere
                      </a>
                    </th>
                    <th scope="col">
                      <a onClick={() => this.sort(currentpagerecords, "stock")}>
                        Stock
                      </a>
                    </th>
                    <th scope="col">
                      <a onClick={() => this.sort(currentpagerecords, "rate")}>
                        Rate
                      </a>
                    </th>
                    <th scope="col" />
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentpagerecords.map(m => (
                    <tr key={m._id}>
                      <td>{m.Title}</td>
                      <td>{m.Genre}</td>
                      <td>{m.NumberInStock}</td>
                      <td>{m.DailyRentalRate}</td>
                      <td>
                        <Like />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(m)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                items={this.state.movies}
                pageSize={this.state.pagesize}
                PageArray={PageArray}
                clicked={this.clicked}
                prevPageClick={this.prevPageClick}
                nextPageClick={this.nextPageClick}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
