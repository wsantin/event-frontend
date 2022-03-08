import React from 'react';
import { Grow  } from "@mui/material";
import { useSnackbar } from 'notistack';

export const notify = (message='success') => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { enqueueSnackbar } = useSnackbar();

  return (
    <button
      onClick={() => {
        enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 2000
        });
        enqueueSnackbar('success', { 
          variant: 'success', 
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
          autoHideDuration: 2000,
          preventDuplicate: true,
          ransitionComponent: Grow,
        });

      }}>
      button
    </button>
  );
};
