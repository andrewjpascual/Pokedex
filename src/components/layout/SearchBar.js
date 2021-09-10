import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <div class="px-3 py-2 border-bottom ">
        <div class="container d-flex flex-wrap justify-content-center">
          <form class="col-12 col-lg-auto  mb-lg-0 me-lg-auto">
            <i class="fas fa-search">
              <input
                type="search"
                class="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </i>
          </form>

          <div class="text-end">
            <div>Hello</div>
          </div>
        </div>
      </div>
    );
  }
}
