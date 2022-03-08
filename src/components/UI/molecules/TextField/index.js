import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from "@emotion/react";
import TextField  from '@mui/material/TextField';
import { Button, Grid, Avatar, Typography, Grow, InputLabel, InputAdornment, CircularProgress, OutlinedInput } from "@mui/material";
// import useStyles from './TextField.css';
// import clsx from 'clsx';

const TextFieldM = (props) => {
  const theme = useTheme();

  // const classes = useStyles();
  const inputRef = useRef(null);
  const {
    id,
    label,
    name,
    margin,
    fullWidth,
    value,
    onChange,
    onBlur,
    errors,
    touched,
    type,
    disabled,
    multiline,
    rowsMax,
    style,
    size,
    variant,
    placeholder,
    required,
    autoFocus
  } = props;

  const scrollToRef = useCallback((ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  }, []);

  useEffect(() => {
    if (Object.keys(errors)[0] === name) {
      scrollToRef(inputRef);
    }
  }, [errors, name, scrollToRef]);

  return (
    <TextField
      inputRef={inputRef}
      margin="normal"
      // label="Code Afiliate"
      // fullWidth
      sx={{
        // display: "block",
        borderRadius: "6px 6px 6px 6px",
        color: theme.palette.primary.main,
        m:0
      }}
      variant={variant && 'standard'}
      placeholder="name"
      id={id}
      name={name}
      size={size}
      type={type}
      value={value}
      fullWidth={fullWidth}
      placeholder={placeholder}
      multiline={multiline}
      onChange={onChange}
      label={label}
      error={errors[name] && touched[name] && Boolean(errors[name])}
      onBlur={onBlur}
      touched={errors[name] && touched[name] && Boolean(errors[name])}
      disabled={disabled}
      required={required}
      inputRef={inputRef}
      // className={clsx('blue', !(errors[name] && touched[name] && Boolean(errors[name])) ? 'red' : null)}
      helperText={errors[name] && touched[name] ? errors[name] : ''}
      endAdornment={
        <InputAdornment position="end">
         dsfsdf
        </InputAdornment>
      }
      autoFocus={autoFocus}
    />
      
    // <TextField 
    //   // data-testid="TextField"
    //   inputRef={inputRef}
    //   // className={clsx(classes.root, !(errors[name] && touched[name] && Boolean(errors[name])) ? classes.default : null)}
    //   id={id}
    // //   style={style}
    //   name={name}
    //   type={type}
    //   label={label}
    //   margin={margin}
    //   variant={variant}
    //   fullWidth={fullWidth}
    //   value={value}
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   multiline={multiline}
    //   rows={rowsMax}
    //   error={errors[name] && touched[name] && Boolean(errors[name])}
    //   helperText={errors[name] && touched[name] ? errors[name] : ''}
    //   disabled={disabled}
    //   // InputLabelProps={
    //   //   type === 'date'
    //   //     ? {
    //   //         shrink: true
    //   //       }
    //   //     : {}
    //   // }
    // />
  );
};

TextField.defaultProps = {
  disabled: false,
  multiline: false,
  // rowsMax: 0,
  errors: {},
  fullWidth: false,
  id: '',
  label: '',
  margin: 'normal',
  onBlur: (e) => e,
  onChange: (e) => e,
  touched: {},
  type: 'text',
  value: '',
  variant: 'outlined',
  style:{},
  placeholder: '',
  size:'small',
  required: false,
  autoFocus: false
};

export default React.memo(TextFieldM);
