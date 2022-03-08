import { Edit } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomTextField from "../UI/CustomTextField";

function EditPersonalForm(props) {
  return (
    <Box sx={{ p: { xs: 0, md: 10 }, pt: { xs: 0, md: 0 } }}>
      <Typography variant="h6" color="textSecondary">
        My Data
      </Typography>
      <Box component="form" width="100%" noValidate sx={{ mt: 4 }}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label="Telegram"
              variant="standard"
              size="small"
              defaultValue="xxxx"
              required={true}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <CustomTextField
              label="Email"
              variant="standard"
              defaultValue="xxxx@protonmail.com"
              size="small"
              fullWidth
              required={true}
            />
          </Grid>
          <Grid item xs={false} md={5}></Grid>
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="name"
              variant="standard"
              // type="password"
              defaultValue="xxxx"
              size="small"
              fullWidth
              required={true}
            />
          </Grid>
          <Grid item xs={false} md={5}></Grid>
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="Country"
              variant="standard"
              size="small"
              defaultValue="PERU"
              fullWidth
              required={true}
            />
          </Grid>
          <Grid item xs={false} md={5}></Grid>
        </Grid>
        <Button variant="contained" endIcon={<Edit />} sx={{ mt: 3, mb: 4 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default EditPersonalForm;
