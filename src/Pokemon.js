import React, { useState, useEffect } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constant";
import axios from "axios";

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  //using the pokemon state var, call the API based on pokemonId
  //then use whatever variables necessary
  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1">
          {`${id}.`}
          {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height : {height} </Typography>
        <Typography>Weight : {weight} </Typography>
        <Typography variant="h4">Types : </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
    );
  };

  //Three states being tracked in this component:
  // 1. Pokemon data = undefined, this means we are grabbing info
  // 2. Pokemon = Good data, we got the data so return it
  // 3. Pokemon = bad data, return pokemon not found
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          Back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
