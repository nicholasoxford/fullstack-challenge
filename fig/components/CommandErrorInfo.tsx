import { FC } from 'react';
import React from 'react';
import { Alert } from '@mui/material';
import { errorMessage } from "../types/errorMessage";

export const CommandErrorInfo: FC<errorMessage> = props => {
  return (props.error &&
    <Alert severity="error">
      <div>{props.error}</div>
    </Alert>

  );
};
