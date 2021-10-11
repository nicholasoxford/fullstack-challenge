/* eslint-disable react/no-unescaped-entities */

import { FC } from 'react';
import React from 'react';
import { Alert } from '@mui/material';
import { errorMessage } from "../types/errorMessage";

export const ErrorInfo: FC<errorMessage> = props => {
  return (props.error &&
    <Alert severity="error">
      Canont find <b>{props.command}</b> in Fig's spec, try again ex:
      <code> echo "hello world"</code>
      <div>{props.error}</div>
    </Alert>

  );
};


