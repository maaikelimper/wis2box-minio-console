// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { useState } from "react";
import * as cicons from "mds";
import * as micons from "mds";
import { Box, Grid, Loader, RadioGroup } from "mds";

const IconsScreen = () => {
  const [color, setColor] = useState<string>("default");
  return (
    <Box
      sx={{
        position: "relative" as const,
        padding: "20px 35px 0",
        "& h6": {
          color: "#777777",
          fontSize: 30,
        },
        "& p": {
          "& span:not(*[class*='smallUnit'])": {
            fontSize: 16,
          },
        },
      }}
    >
      <Grid container>
        <RadioGroup
          selectorOptions={[
            { value: "def", label: "Default" },
            { value: "red", label: "Color" },
          ]}
          currentValue={color}
          id={"color-selector"}
          name={"color-selector"}
          onChange={(c) => {
            setColor(c.target.value);
          }}
        />
      </Grid>
      <h1>Logos</h1>
      <Grid
        container
        sx={{
          fontSize: 12,
          wordWrap: "break-word",
          "& .min-loader": {
            width: 45,
            height: 45,
          },
          "& .min-icon": {
            color: color === "red" ? "red" : "black",
          },
        }}
      >
        <Grid item xs={3}>
          <cicons.ThemedLogo />
          <br />
          ThemedLogo
        </Grid>
      </Grid>
      <h1>Loaders</h1>
      <Grid
        container
        sx={{
          fontSize: 12,
          wordWrap: "break-word",
          "& .min-loader": {
            width: 45,
            height: 45,
          },
          "& .min-icon": {
            color: color === "red" ? "red" : "black",
          },
        }}
      >
        <Grid item xs={3}>
          <Loader />
          <br />
          Loader
        </Grid>
      </Grid>
      <h1>Icons</h1>
      <Grid
        container
        sx={{
          fontSize: 12,
          wordWrap: "break-word",
          "& .min-loader": {
            width: 45,
            height: 45,
          },
          "& .min-icon": {
            color: color === "red" ? "red" : "black",
          },
        }}
      >
      </Grid>
    </Box>
  );
};

export default IconsScreen;
