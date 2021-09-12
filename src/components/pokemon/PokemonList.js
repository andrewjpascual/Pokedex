import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";

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
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
        />
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
