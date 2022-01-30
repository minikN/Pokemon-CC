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

const Pokemon = (): ReactElement => {
  const { state, dispatch } = useContext(store);
  const alreadyAdded = state.pokemonList.find((pokemon) => pokemon.id === state.currentPokemon?.id);

  return (
    <Card sx={{ display: 'flex' }}>
      <ResponsiveBox>
        <CardMedia
          component="img"
          image={state.currentPokemon?.sprites.artwork.href}
          alt={state.currentPokemon?.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '0 1 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {state.currentPokemon?.name &&
                state.currentPokemon.name.charAt(0).toUpperCase() +
                  state.currentPokemon.name.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Abilities</b>:{' '}
              {state.currentPokemon?.abilities.map((ability) => ability.ability.name).join(', ')}
              <br />
              <b>Moves</b>: {state.currentPokemon?.moves.map((move) => move.move.name).join(', ')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                if (state.currentPokemon) {
                  if (alreadyAdded) {
                    dispatch({
                      type: 'removePokemonFromList',
                      id: state.currentPokemon.id,
                    });
                    dispatch({
                      type: 'setNotification',
                      notification: {
                        level: 'info',
                        message: `${state.currentPokemon.name} removed from the list.`,
                      },
                    });
                  } else {
                    dispatch({
                      type: 'addPokemonToList',
                      pokemon: state.currentPokemon,
                    });
                    dispatch({
                      type: 'setNotification',
                      notification: {
                        level: 'success',
                        message: `${state.currentPokemon.name} added tothe list.`,
                      },
                    });
                  }
                }
              }}
            >
              {(!alreadyAdded && 'Add to list') || 'Remove from list'}
            </Button>
          </CardActions>
        </Box>
      </ResponsiveBox>
    </Card>
  );
};

export default Pokemon;
