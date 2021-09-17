import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

//Parent class and initialize pokemon variables for mapping the cards
export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151/",
    url2: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=151/",
    url3: "https://pokeapi.co/api/v2/pokemon?limit=135&offset=251/",
    url4: "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386/",
    url5: "https://pokeapi.co/api/v2/pokemon?limit=156&offset=493/",
    url6: "https://pokeapi.co/api/v2/pokemon?limit=72&offset=649/",
    url7: "https://pokeapi.co/api/v2/pokemon?limit=88&offset=721/",
    url8: "https://pokeapi.co/api/v2/pokemon?limit=809/",
    pokemon: null,
    pokeTemp: null,
    pokeTemp2: null,
    pokeTemp3: null,
    pokeTemp4: null,
    pokeTemp5: null,
    pokeTemp6: null,
    pokeTemp7: null,
    pokeTemp8: null,

    searchValue: "",
    catValue: 1,
  };

  //information about pokemon
  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
    this.setState({ pokeTemp: res.data["results"] });

    const res2 = await axios.get(this.state.url2);
    this.setState({ pokeTemp2: res2.data["results"] });

    const res3 = await axios.get(this.state.url3);
    this.setState({ pokeTemp3: res3.data["results"] });

    const res4 = await axios.get(this.state.url4);
    this.setState({ pokeTemp4: res4.data["results"] });

    const res5 = await axios.get(this.state.url5);
    this.setState({ pokeTemp5: res5.data["results"] });

    const res6 = await axios.get(this.state.url6);
    this.setState({ pokeTemp6: res6.data["results"] });

    const res7 = await axios.get(this.state.url7);
    this.setState({ pokeTemp7: res7.data["results"] });

    const res8 = await axios.get(this.state.url8);
    this.setState({ pokeTemp8: res8.data["results"] });
  }

  //user search for pokemon
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchValue: value });
    this.filterPokemon(value);
  };

  //calling this function will filter pokemon based on value
  filterPokemon = (userSearch) => {
    const allPokemon = [...this.state.pokeTemp8];
    this.setState({
      pokemon: allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(userSearch.toLowerCase())
      ),
    });
  };

  //category for pokemon
  handleCatChange = (event) => {
    const value = event.target.value;
    this.setState({ catValue: value });
    this.catOnPokemons(value);
  };

  //This will fix the category select
  catOnPokemons = (gen) => {
    const val = gen;
    const allPokemon = [...this.state.pokeTemp];
    const allPokemon2 = [...this.state.pokeTemp2];
    const allPokemon3 = [...this.state.pokeTemp3];
    const allPokemon4 = [...this.state.pokeTemp4];
    const allPokemon5 = [...this.state.pokeTemp5];
    const allPokemon6 = [...this.state.pokeTemp6];
    const allPokemon7 = [...this.state.pokeTemp7];
    const allPokemon8 = [...this.state.pokeTemp8];

    if (val == 1) {
      this.setState({
        pokemon: allPokemon.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 2) {
      this.setState({
        pokemon: allPokemon2.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 3) {
      this.setState({
        pokemon: allPokemon3.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 4) {
      this.setState({
        pokemon: allPokemon4.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 5) {
      this.setState({
        pokemon: allPokemon5.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 6) {
      this.setState({
        pokemon: allPokemon6.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 7) {
      this.setState({
        pokemon: allPokemon7.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
    if (val == 8) {
      this.setState({
        pokemon: allPokemon8.filter((pokemon) => pokemon.name.toLowerCase()),
      });
    }
  };

  //maps the cards based on search
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
              <select
                id="gen"
                onChange={this.handleCatChange}
                value={this.state.catValue}
              >
                <option value="1">GEN1</option>
                <option value="2">GEN2</option>
                <option value="3">GEN3</option>
                <option value="4">GEN4</option>
                <option value="5">GEN5</option>
                <option value="6">GEN6</option>
                <option value="7">GEN7</option>
                <option value="8">ALL</option>
              </select>
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
