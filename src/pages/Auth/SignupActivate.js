import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { Button, Grid, Avatar, Typography, Grow, InputLabel, InputAdornment, 
  CircularProgress, OutlinedInput, IconButton, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { Lock } from "@mui/icons-material";

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack';

import TextFieldM from '../../components/UI/molecules/TextField'

import { putActivateOtp, putSignupActivate } from '../../api/Auth'

import { Login as LoginLayout } from "../../layouts/Login";
import CustomTextField from "../../components/UI/CustomTextField";

function SignupActivate(props) {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const email  = history.location.state?.email || null

  const [counter, setCounter] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log("values: ",values)
    const payload = {
      email: email,
      code_activate: values.code_activate
    }
    console.log("Payload: ",payload)
    setIsLoading(true)
    try {
      const { data } = await putActivateOtp(payload)
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
      code_activate: '',
    },
    validationSchema: Yup.object({
      code_activate: Yup
      .string()
      .min(6, 'Minumum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Code is required')
    
    }),
    onSubmit,
  })

  const handlerSendCode = async() => {
    setCounter(3) 
    await putActivateOtp({email})
  }

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect( () => {
    console.log("email: ",email)
    if(!email){
      history.push('/');
    }
  }, [email]);

  return (
    <LoginLayout type="signup">
      <Box sx={{ display: 'grid', textAlign: 'left !important' }} >
      {/* <Avatar sx={{ mb: 1, bgcolor: "gray", mt: 7 }}>
        <Lock />
      </Avatar> */}
      <Typography component="h1" variant="h6" color="textSecondary">
        Verification Code 
      </Typography>
      </Box>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        noValidate
        sx={{ mt: 3 }}
      >
        <Box sx={{ fontWeight: 'light' }} mb={2}>
          Send to {email}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OutlinedInput
              id="code_activate"
              name="code_activate"
              value={values.code_activate}
              placeholder="Aproved Code"
              onChange={handleChange}
              fullWidth={true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                  { counter === 0 ? <Button onClick={handlerSendCode}> Send Code </Button> : counter}
                  </IconButton>
                </InputAdornment>
              }
              // aria-describedby="component-error-text"
              error={errors['code_activate'] && touched['code_activate'] && Boolean(errors['code_activate'])}
              // touched={errors['code_activate'] && touched['code_activate'] && Boolean(errors['code_activate'])}
              // helperText={errors['code_activate'] && touched['code_activate'] ? errors['code_activate'] : ''}
              // touched={errors['code_activate'] && touched['code_activate'] && Boolean(errors['code_activate'])}
            />
            {
              errors['code_activate'] ? <FormHelperText id="component-error-text" style={{color:'#d32f2f', paddingLeft:'15px'}}> {errors['code_activate']}  </FormHelperText>  : ''
            }

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
        >
          Activate
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

export default SignupActivate;
