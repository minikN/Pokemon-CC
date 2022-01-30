import React, { ReactElement, useContext, useEffect } from 'react';
import { store } from '../App/AppState';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Notifications = (): ReactElement => {
  const { state } = useContext(store);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [state.notification]);

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (state.notification) {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={state.notification.level}
          elevation={6}
          variant="filled"
        >
          {state.notification.message}
        </MuiAlert>
      </Snackbar>
    );
  }

  return <></>;
};

export default Notifications;
