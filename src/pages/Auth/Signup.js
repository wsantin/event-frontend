import React, { useState} from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { Button, Grid, Avatar, Typography, Grow, InputLabel, InputAdornment, CircularProgress, OutlinedInput } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from "@mui/system";
import { Lock } from "@mui/icons-material";

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack';

import TextFieldM from '../../components/UI/molecules/TextField'

import { postSignup } from '../../api/Auth'

import { Login as LoginLayout } from "../../layouts/Login";
import CustomTextField from "../../components/UI/CustomTextField";

function Signup(props) {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const { data } = await postSignup(values)
      enqueueSnackbar('success', { 
        variant: 'success', 
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        autoHideDuration: 500,
        preventDuplicate: true,
        ransitionComponent: Grow,
      });
      setIsLoading(false)
      
      if(data === 'code'){
        setTimeout(() =>{
          history.push({
            pathname: `/activate`,
            state:{
              email: values.email
            }
          });
        }, 500)
      }
      else{
        setTimeout(() =>{
          history.push('/');
        }, 500)
      }
      
    } catch (error) {
      console.log("ERROR: ",error)
      setIsLoading(false)
      const code = error.data?.error?.code || null
      enqueueSnackbar(code ? code: 'Error' , { 
        variant: 'error', 
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        autoHideDuration: 2000,
        preventDuplicate: true,
        ransitionComponent: Grow,
      });
      
      // if(error.data?.error?.code === 'access_invalid'){
      //   history.push("/recovery-password");
      //   return
      // }
      // console.log("ERROR: ",error)
      return
    }
  }

  const { setFieldValue, setFieldTouched, handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      telegram: '',
      name: '',
      email: '',
      password: '',
      code_referrer: '',
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
        .min(3,'Minimum 3 characters')
        .max(25, 'Maximum 25 characters')
        .required('Name is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(50, 'Maximum 50 characters')
        .required('Email is required'),
      password: Yup
        .string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
    }),
    onSubmit,
  })

  const handleClickShowPassword = () => {
    setShowPassword( prev => !prev)
  };

  return (
    <LoginLayout type="signup">
      <Avatar sx={{ mb: 1, bgcolor: "gray", mt: 7 }}>
        <Lock />
      </Avatar>
      <Typography component="h1" variant="h6" color="textSecondary">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldM
              id="email"
              name="email"
              placeholder="Email@email.com"
              value={values.email}
              size="large"
              onChange={handleChange}
              errors={errors}
              touched={touched}
              fullWidth={true}
              label="Email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              placeholder="password"
              onChange={handleChange('password')}
              fullWidth={true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    { showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldM
                id="name"
                name="name"
                placeholder="Name"
                value={values.name}
                size="large"
                onChange={handleChange}
                errors={errors}
                touched={touched}
                fullWidth={true}
                label="Name"
                required
              />
          </Grid>
          <Grid item xs={12}>
            <TextFieldM
                id="telegram"
                name="telegram"
                placeholder="telegram"
                value={values.telegram}
                size="large"
                onChange={handleChange}
                errors={errors}
                touched={touched}
                fullWidth={true}
                label="telegram"
              />
          </Grid>
          <Grid item xs={12}>
            <TextFieldM
                id="code_referrer"
                name="code_referrer"
                placeholder="Code Referer"
                value={values.code_referrer}
                size="large"
                onChange={handleChange}
                errors={errors}
                touched={touched}
                fullWidth={true}
                label="Code Referer"
              />
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            padding: "12px",
            mt: 2,
            mb: 2,
            color: "#ffffff",
          }}
          disabled={isLoading}
        >
          Register {isLoading ? <CircularProgress/> : ''}
        </Button>

        <Box textAlign="center" sx={{ mt: 2, mb: 3 }}>
          <Button
            sx={{ color: "#2196f3", p: 0 }}
            variant="body2"
            type="button"
            onClick={() => history.push("/login")}
          >
            SignIn
          </Button>
        </Box>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </Box>
      </LoginLayout>
  );
}

export default Signup;
