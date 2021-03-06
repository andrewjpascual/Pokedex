import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import spinner from "../layout/spinner.gif";
import leftPad from "left-pad";
import "@fontsource/alata";

//styled components for sprite, card and links to each pokemon
const Sprite = styled.img`
  width: 10em;
  height: 10em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

//initializing state variables for Pokemon Cards
export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",

    imageLoading: true,
    toManyRequests: false,
  };

  //Function dealing with the API information
  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

    this.setState({ name, imageUrl, pokemonIndex });
  }

  //Render the card and what is on it
  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header">
              {"#"}
              {leftPad(this.state.pokemonIndex, 3, 0)}
            </h5>
            {this.state.imageLoading ? (
              <img
                src={spinner}
                alt="loading..."
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-3"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-4"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style={
                this.state.toManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            />
            {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}

            <div className="card-body mx-auto">
              <h5 className="card-title" style={{ fontFamily: "alata" }}>
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h5>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
