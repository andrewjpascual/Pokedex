import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";
import "@fontsource/alata";
import leftPad from "left-pad";

//setting all the pokemon colors to respective types
const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

//styled component for the back button
const StyledLink = styled(Link)`
  text-decoration: none;
  color: Red;
  font-family: alata;
  font-size: 1.7rem;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class Pokemon extends Component {
  //initialize the state variables
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    foreign: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    themeColor: "#EF5350",
  };

  //Fetching required information function, async to wait for the GET requests
  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Get basic Pokemon Information
    const pokemonRes = await Axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

    //stating empty variables to assign them in the following forEach method
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.forEach((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

    //maps each type for each pokemon, returning us the array of types into const types
    const types = pokemonRes.data.types.map((type) => type.type.name);

    //Grab color for the 2nd type and the 1st type
    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
    const themeColor2 = `${TYPE_COLORS[types["0"]]}`;

    //mapping through the abilities and returning them
    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    //filtering any EVs that require effort
    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    // Get Pokemon Description .... From second end point
    await Axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.forEach((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      //This is the cool Japanese logo behind each pokemon
      let foreign = "";
      res.data.names.forEach((nameres) => {
        if (nameres.language.name === "ja") {
          foreign = nameres.name;
          return;
        }
      });

      //Grabbing the female and male ratios for the pokemon
      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      //This is grabbing the species for each pokemon
      const eggGroups = res.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      //This sets the new state for our variables
      this.setState({
        description,
        foreign,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });

    //This sets the new state for our variables
    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      themeColor,
      themeColor2,
      height,
      weight,
      abilities,
      evs,
    });
  }

  //Return and render out the page for each individual pokemon
  render() {
    return (
      <div className="col">
        <StyledLink to={`/`}> Go back</StyledLink>

        <div className="card" class="shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <div className="row align-items-center">
              <div
                className="col-md-5 rounded shadow"
                style={{
                  backgroundColor: `#${this.state.themeColor2}`,
                }}
              >
                <h3 style={{ fontFamily: "alata", color: "white" }}>
                  #{leftPad(this.state.pokemonIndex, 3, 0)}
                </h3>
                <h3
                  style={{
                    textAlign: "center",
                    fontFamily: "alata",
                    color: "white",
                    fontSize: "60px",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.foreign}
                </h3>

                <img
                  src={this.state.imageUrl}
                  alt="pokemon"
                  className="card-img-top rounded mx-auto mt-2"
                  style={{
                    height: "70%",
                    width: "70%",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </div>

              <div className="col-md-7">
                <h1
                  className="mx-auto"
                  style={{ textAlign: "center", fontFamily: "alata" }}
                >
                  {this.state.name
                    .toLowerCase()
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h1>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    HP
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar  "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.hp}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    Attack
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    Defense
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    Speed
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    Sp Atk
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow={this.state.stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div
                    className={`col-12 col-md-${this.state.statTitleWidth}`}
                    style={{ textAlign: "center", fontFamily: "alata" }}
                  >
                    Sp Def
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                        aria-valuenow={this.state.stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row ">
                  <div
                    className="col"
                    style={{ fontFamily: "alata", fontSize: "20px" }}
                  >
                    <p className="mt-5 mx-auto  ">
                      " {this.state.description} "
                    </p>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {this.state.types.map((type) => (
                      <span
                        key={type}
                        className="badge badge-pill mr-1"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[type]}`,
                          color: "white",
                          fontSize: "15px",
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
                          .join(", ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 class="card-title text-center mb-4">Pokémon Training</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Height:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.height} ft.</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Weight:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.weight} lbs</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.catchRate}%</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-6">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: "#c2185b",
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioFemale}% </small>
                      </div>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: "#1976d2",
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioMale}% </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.eggGroups} </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.hatchSteps}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">EVs:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
