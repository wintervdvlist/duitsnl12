import React from "react";
import { Typography, Toolbar, AppBar } from "material-ui";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="headline" color="inherit">
          Duits - Nederlands
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
