import React, { useState, useEffect } from "react";
import {
  Typography,
  Link,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constant";
import axios from "axios";
import leftPad from "left-pad";
import "@fontsource/alata";

const newStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Fullgrid: {
    margin: "auto",
    paddingTop: "200px",
  },
  cardStyle: {
    marginTop: "80px",
    marginLeft: "25%",

    textAlign: "center",
    width: "1000px",
  },
  backButton: {
    marginTop: "30px",
    marginLeft: "25%",
    marginRight: "100px",
    textAlign: "center",
  },
  cardBG: {},
}));

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const classes = newStyles();

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

    const fullPic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <div className={classes.root}>
        <Card className={classes.cardStyle} raised={true}>
          <Grid container spacing={2} classname={classes.Fullgrid}>
            <Grid item xs={6}>
              <div className={classes.cardBG}>
                <Typography variant="h1" className={classes.pokeID}>
                  {` #${leftPad(id, 3, 0)}`}
                </Typography>
                <img src={fullPic}></img>
                <Typography>{pokemon.types["0"].type.name}</Typography>
              </div>
              <Typography variant="h1">{toFirstCharUppercase(name)}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h3">Pokémon Info</Typography>
              <Typography>Height : {height} </Typography>
              <Typography>Weight : {weight} </Typography>
              <Typography variant="h4">Types : </Typography>
              <Typography>Types : </Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <li> {`${name}`}</li>;
              })}
            </Grid>
          </Grid>
        </Card>
      </div>
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
      {pokemon === false && <Typography>Pokémon not found</Typography>}

      {pokemon !== undefined && (
        <Button
          className={classes.backButton}
          variant="contained"
          onClick={() => history.push("/")}
        >
          Back to Pokédex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
