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
import { toFirstCharUppercase, getColor } from "./constant";
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

  pokeID: {
    fontFamily: "alata",
    fontSize: "30px",
    height: "40px",
    width: "80px",
    color: "white",
  },
  pokeName: {
    fontFamily: "alata",
    color: "white",
  },
  cardPic: {
    height: "350px",
    width: "350px",
  },
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

    const ccolor = pokemon.types["0"].type.name;
    return (
      <div className={classes.root}>
        <Card className={classes.cardStyle} raised={true}>
          <Grid container spacing={2} classname={classes.Fullgrid}>
            <Grid item xs={6}>
              <div style={{ backgroundColor: getColor(types) }}>
                <Typography variant="h1" className={classes.pokeID}>
                  {` #${leftPad(id, 3, 0)}`}
                </Typography>
                <Typography variant="h2" className={classes.pokeName}>
                  {toFirstCharUppercase(name)}
                </Typography>

                <img src={fullPic} className={classes.cardPic}></img>
              </div>
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
