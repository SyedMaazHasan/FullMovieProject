import React, { Component } from "react";
class Pagination extends Component {
  state = {
    prevPage: "page-link diabled"
  };
  render() {
    return (
      <nav aria-label="...">
        <ul className="pagination">
          <li
            className={
              this.props.currentPage === 1 ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => this.props.prevPageClick()}
              href="#"
            >
              Previous
            </a>
          </li>

          {this.props.PageArray.map(r => (
            <li className="page-item" key={r}>
              <a
                className="page-link"
                onClick={() => this.props.clicked(r)}
                href="#"
              >
                {r}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              onClick={this.props.nextPageClick}
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
