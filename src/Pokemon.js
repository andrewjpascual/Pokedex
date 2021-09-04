import React from "react";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  return <div>{`hey this is individual page for pokemon # ${pokemonId}`}</div>;
};

export default Pokemon;
