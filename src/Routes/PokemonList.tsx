import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  createStyles,
  makeStyles,
  Theme,
  styled,
  Paper,
  Grid,
} from '@mui/material';
import { red, blue, green } from '@mui/material/colors';
import React, { ReactElement, useContext, useEffect } from 'react';
import { store } from '../App/AppState';

const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },
  display: 'flex',
}));

const PokemonList = (): ReactElement => {
  const { state, dispatch } = useContext(store);

  return (
    <>
      {state.pokemonList.map((pokemon) => (
        <Card sx={{ display: 'flex' }} key={pokemon.id}>
          <ResponsiveBox>
            <CardMedia component="img" image={pokemon.sprites.artwork.href} alt={pokemon.name} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '0 1 auto' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name && pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Abilities</b>:{' '}
                  {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
                  <br />
                  <b>Moves</b>: {pokemon.moves.map((move) => move.move.name).join(', ')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch({
                      type: 'removePokemonFromList',
                      id: pokemon.id,
                    });
                  }}
                >
                  Remove from list
                </Button>
              </CardActions>
            </Box>
          </ResponsiveBox>
        </Card>
      ))}
      {state.pokemonList.length === 0 && <Typography>No Pokemons added yet.</Typography>}
    </>
  );
};

export default PokemonList;
