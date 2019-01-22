import React from 'react';
import Typography from '@material-ui/core/Typography';
import ChangePassword from './ChangePassword';
import { Card, CardContent } from '@material-ui/core';

export default () => (
  <div>
    <Typography variant="h2" gutterBottom align="center">
      Innstillinger
    </Typography>
    <Card className="content-0">
      <CardContent>
        <Typography variant="h5" gutterBottom align="left">
          Endre passord
        </Typography>
        <ChangePassword />
      </CardContent>
    </Card>
  </div>
);
