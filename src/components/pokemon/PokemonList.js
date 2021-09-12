import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151/",
    pokemon: null,
    pokeTemp: null,
    searchValue: "",
  };

  //information about pokemon
  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
    this.setState({ pokeTemp: res.data["results"] });
  }

  //user search for pokemon
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchValue: value });
    this.filterPokemon(value);
  };

  //calling this function will filter pokemon based on value
  filterPokemon = (userSearch) => {
    const allPokemon = [...this.state.pokeTemp];
    this.setState({
      pokemon: allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(userSearch.toLowerCase())
      ),
    });
  };

  render() {
    return (
      <div>
        <div class="px-3 py-2 border-bottom mb-3">
          <div class="container d-flex flex-wrap justify-content-center">
            <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
              <input
                type="text"
                value={this.state.searchValue}
                onChange={this.handleInputChange}
                placeholder="Search for Pokémon..."
              />
            </form>
            <div class="text-end">
              <a
                href="http://github.com/andrewjpascual"
                target="_blank"
                rel="noopener noreferrer"
                class="icon brands fa-github"
              >
                <h3>
                  <FaGithub />
                </h3>
              </a>
            </div>
          </div>
        </div>

        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
