import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  InputBase,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUppercase } from "./constant";

import axios from "axios";

import logo from "./img/logo.png";
import leftPad from "left-pad";
import "@fontsource/alata";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "80px",
  },
  cardStyle: {
    backgroundColor: "white",

    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  cardMediaBG: {
    backgroundColor: "#cccccc",
    height: "190px",
  },
  cardMediaCircle: {
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    backgroundColor: "#e6e6e6",
  },
  cardMedia: {
    margin: "auto",
    height: "150px",
    width: "150px",
    position: "static",
  },
  cardContent: {
    textAlign: "center",
  },
  navStyle: {
    backgroundColor: "#ff3333",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  logo: {
    maxWidth: "180px",
    marginLeft: "30px",
    marginRight: "30px",
  },
  pokeName: {
    fontFamily: "alata",
  },
  pokeID: {
    fontFamily: "alata",
    fontSize: "25px",
    height: "35px",
    width: "80px",
  },
}));

//passing through our styles from above
//using pokemonData as a state from "mockData"
const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  //eventHandler for search bar and changes
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  //Mapping info from API into variables
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  //This deals with how each individual card looks
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    console.log(pokemonData[`${pokemonId}`]);
    return (
      <Grid item xs={4} key={pokemonId} className={classes.grid}>
        <Card
          className={classes.cardStyle}
          onClick={() => history.push(`/${pokemonId}`)}
          raised={true}
        >
          <CardActionArea>
            <div className={classes.cardMediaBG}>
              <Typography className={classes.pokeID}>
                {` #${leftPad(id, 3, 0)}`}
              </Typography>
              <CardMedia className={classes.cardMediaCircle}>
                <LazyLoadImage
                  alt="image-pokemon"
                  src={sprite}
                  visibleByDefault={false}
                  delayMethod={"debounce"}
                  effect="blur"
                  className={classes.cardMedia}
                />
              </CardMedia>
            </div>
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.pokeName}
                variant="h4"
              >{`${toFirstCharUppercase(name)}`}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  //This deals with the layout of the main page
  return (
    <>
      <AppBar className={classes.navStyle}>
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for a pokémon..."
              onChange={handleSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
