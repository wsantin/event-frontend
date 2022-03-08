import React, { useState} from "react";
import { Button, Grid, Avatar, Typography, Grow, InputLabel, InputAdornment, 
  CircularProgress, OutlinedInput ,IconButton, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Lock } from "@mui/icons-material";
import { useHistory } from "react-router";
import { useTheme } from "@emotion/react";
import { useSnackbar } from 'notistack';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import TextFieldM from '../../components/UI/molecules/TextField'

import { postSignin } from '../../api/Auth'
import { Login as LoginLayout } from "../../layouts/Login";

function Signin(props) {
  const theme = useTheme();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const { data } = await postSignin(values)
      console.log("ISGNIP: ",data)
      localStorage.setItem("token", data);
      enqueueSnackbar('success', { 
        variant: 'success', 
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        autoHideDuration: 1200,
        preventDuplicate: true,
        ransitionComponent: Grow,
      });
      setIsLoading(false)
      setTimeout(() =>{
        history.push("/dashboard");
      }, 1200)
      
    } catch (error) {
      setIsLoading(false)
      if(error.data?.error?.code === 'required_code_activate'){
        history.push({
          pathname: `/activate`,
          state:{
            email: values.email
          }
        });
        return
      }
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
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
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

  function handleDontHaveAcc() {
    history.push("/signup");
  }

  return (
    <LoginLayout>
      <Avatar sx={{ mb: 1, bgcolor: "gray" }}>
        <Lock />
      </Avatar>
      <Typography component="h1" variant="h6" color="textSecondary">
        Admin
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        noValidate
        sx={{ mt: 3 }}
      >
        <Box sx={{ mb: 1 }}>
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
            autoFocus
          />
        </Box>
        <Box sx={{ mb: 1 }}>
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
            required
          />
          {
            errors['password'] ? <FormHelperText id="component-error-text" style={{color:'#d32f2f', paddingLeft:'15px'}}> {errors['password']}  </FormHelperText>  : ''
          }
        </Box>
        
        {/* <Box sx={{ mt: 2, mb: 1 }}>
          <Button variant="text" sx={{ color: "#2196f3", p: 0 }}>
            Ingresar
          </Button>
        </Box> */}

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
          Sign in {isLoading ? <CircularProgress/> : ''}
        </Button>

        <Box textAlign="center" sx={{ mt: 2, mb: 3 }}>
          <Button
            sx={{ color: "#2196f3", p: 0 }}
            variant="body2"
            type="button"
            onClick={handleDontHaveAcc}
          >
            Register
          </Button>
        </Box>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ alignItems: "center", mt: 5 }}
      >
        {"Copyright © UniqueSms Develop" + new Date().getFullYear()}
      </Typography>

    </LoginLayout>
  );
}

export default Signin;
