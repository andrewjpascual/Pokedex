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
  Paper,
  Container,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { toFirstCharUppercase, getColor } from "./constant";
import axios from "axios";
import leftPad from "left-pad";
import "@fontsource/alata";

const newStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fullCard: {
    margin: "auto",
    paddingTop: "200px",
  },
  cardStyle: {
    marginTop: "150px",
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
  detailGrid: {
    marginTop: "50px",
  },
  detailVariablesCentered: {
    margin: "0 auto",
  },
  cardTitle: {
    margin: "auto",
    marginTop: "50px",
    fontFamily: "alata",
  },
  detailVariablesV: {
    fontFamily: "Verdana",
    fontSize: "20px",
    fontWeight: "bold",
  },
  detailVariablesO: {
    fontFamily: "alata",
    fontSize: "20px",
  },
  typesFix: {
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "Verdana",
  },
}));

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const [pokemon, setPokemon] = useState(undefined);
  const classes = newStyles();

  //let one = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  //let two = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

  //const reqOne = axios.get(one);
  //const reqTwo = axios.get(two);

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
    const {
      name,
      id,
      species,
      height,
      weight,
      types,
      sprites,
      base_experience,
    } = pokemon;

    const type1 = types["0"].type.name;
    const type2 = types["1"].type.name;
    const inches = (pokemon.height * 3.93701).toFixed(0);
    const feet = Math.floor(Number(inches) / 12);

    const fullPic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    function typeChecker() {
      const fullType = "";
      if (types["1"].type.name !== undefined) {
      }
    }

    return (
      <div className={classes.root}>
        <Card className={classes.cardStyle} raised={true}>
          <Grid container spacing={2} classname={classes.fullCard}>
            <Grid item xs={6}>
              <div style={{ backgroundColor: getColor(types) }}>
                <Typography variant="h1" className={classes.pokeID}>
                  {` #${leftPad(id, 3, 0)}`}
                </Typography>
                <Typography variant="h2" className={classes.pokeName}>
                  {toFirstCharUppercase(name)}
                </Typography>

                <img
                  src={fullPic}
                  alt="Pokemon"
                  className={classes.cardPic}
                ></img>
              </div>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h5" className={classes.cardTitle}>
                Pokémon Data
              </Typography>
              <Grid container spacing={0} className={classes.detailGrid}>
                <Grid item xs={3} className={classes.detailVariablesCentered}>
                  <Typography className={classes.detailVariablesV}>
                    Height :
                  </Typography>
                  <Typography className={classes.detailVariablesV}>
                    Weight :
                  </Typography>
                  <Typography className={classes.detailVariablesV}>
                    Base Exp :
                  </Typography>
                </Grid>
                <Grid item xs={3} className={classes.detailVariablesCentered}>
                  <Typography className={classes.detailVariablesO}>
                    {`${feet}'${leftPad(Number(inches) % 12, 2)} " (${
                      pokemon.height / 10
                    }m)`}
                  </Typography>
                  <Typography className={classes.detailVariablesO}>
                    {weight / 10} kg
                  </Typography>
                  <Typography className={classes.detailVariablesO}>
                    {base_experience}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" className={classes.cardTitle}>
                Types
              </Typography>
              <Grid container spacing={0}>
                <Grid item xs={3} className={classes.detailVariablesCentered}>
                  {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}> {`${name}`}</Typography>;
                  })}
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={classes.detailVariablesCentered}
                ></Grid>
              </Grid>
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
