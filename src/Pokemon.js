import React, { useState } from "react";
import mockData from "./mockData";
import { Typography, Link } from "@material-ui/core";
import { toFirstCharUppercase } from "./constant";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

  //using the pokemon state var, call the mockdata based on pokemonId
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
  return <>{generatePokemonJSX()}</>;
};

export default Pokemon;
