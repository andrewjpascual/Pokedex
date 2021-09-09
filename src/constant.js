//Global function to make first letter capitalized
export const toFirstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const getColor = (types) => {
  if (types["0"].type.name === "grass") return "#5fbd58";
  if (types["0"].type.name === "fire") return "#fba54c";
  if (types["0"].type.name === "bug") return "#92bc2c";
  if (types["0"].type.name === "dark") return "#595761";
  if (types["0"].type.name === "dragon") return "#0c69c8";
  if (types["0"].type.name === "electric") return "#f2d94e";
  if (types["0"].type.name === "fairy") return "#ee90e6";
  if (types["0"].type.name === "fighting") return "#d3425f";
  if (types["0"].type.name === "flying") return "#a1bbec";
  if (types["0"].type.name === "ghost") return "#5f6dbc";
  if (types["0"].type.name === "ground") return "#da7c4d";
  if (types["0"].type.name === "ice") return "#75d0c1";
  if (types["0"].type.name === "normal") return "#a0a29f";
  if (types["0"].type.name === "poison") return "#b763cf";
  if (types["0"].type.name === "psychic") return "#fa8581";
  if (types["0"].type.name === "rock") return "#c9bb8a";
  if (types["0"].type.name === "steel") return "#5695a3";
  if (types["0"].type.name === "water") return "#539ddf";

  if (types["1"].type.name === "grass") return "#5fbd58";
  if (types["1"].type.name === "fire") return "#fba54c";
  if (types["1"].type.name === "bug") return "#92bc2c";
  if (types["1"].type.name === "dark") return "#595761";
  if (types["1"].type.name === "dragon") return "#0c69c8";
  if (types["1"].type.name === "electric") return "#f2d94e";
  if (types["1"].type.name === "fairy") return "#ee90e6";
  if (types["1"].type.name === "fighting") return "#d3425f";
  if (types["1"].type.name === "flying") return "#a1bbec";
  if (types["1"].type.name === "ghost") return "#5f6dbc";
  if (types["1"].type.name === "ground") return "#da7c4d";
  if (types["1"].type.name === "ice") return "#75d0c1";
  if (types["1"].type.name === "normal") return "#a0a29f";
  if (types["1"].type.name === "poison") return "#b763cf";
  if (types["1"].type.name === "psychic") return "#fa8581";
  if (types["1"].type.name === "rock") return "#c9bb8a";
  if (types["1"].type.name === "steel") return "#5695a3";
  if (types["1"].type.name === "water") return "#539ddf";
  return "";
};
