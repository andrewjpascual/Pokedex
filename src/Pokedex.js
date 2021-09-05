import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUppercase } from "./constant";
import axios from "axios";
import logo from "./img/logo.png";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardStyle: {
    backgroundColor: "white",
  },
  cardMedia: {
    margin: "auto",
    width: "150px",
    height: "150px",
    backgroundColor: "#e6e6e6",
    borderRadius: "50%",
  },
  cardContent: {
    textAlign: "center",
  },
  navStyle: {
    backgroundColor: "#ff3333",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  logo: {
    maxWidth: "180px",
    marginLeft: "25px",
    marginRight: "25px",
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

  //Grabs data from the api, grabbing only the id, name
  //and sprite image for the cards
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=300")
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

  //This deals with how each card looks
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    console.log(pokemonData[`${pokemonId}`]);
    return (
      <Grid item xs={4} key={pokemonId} className={classes.grid}>
        <Card
          onClick={() => history.push(`/${pokemonId}`)}
          className={classes.cardStyle}
          raised={true}
        >
          <CardActionArea>
            <CardHeader variant="h3" title={`# ${id}`} />

            <CardMedia className={classes.cardMedia} image={sprite} />
            <CardContent className={classes.cardContent}>
              <Typography variant="h4">{`${toFirstCharUppercase(
                name
              )}`}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  //This deals with the layout of the main page
  return (
    <>
      <AppBar position="static" className={classes.navStyle}>
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              label="Search..."
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={6} className={classes.pokedexContainer}>
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
