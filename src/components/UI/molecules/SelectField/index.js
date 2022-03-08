import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormGroup, FormControl, FormHelperText, InputLabel, Select, Input, MenuItem } from '@mui/material';

// import clsx from 'clsx';
// import useStyles from './SelectFieldM.css';

const SelectFieldM = (props) => {
  const { id, name, value, label, items, onChange, itemText, itemValue, disabled, errors, touched, style, variant, size } = props;
  const [currentValue, setCurrentValue] = useState('');
  const selectRef = useRef(null);
  // const classes = useStyles();

  useEffect(() => {
    let selectedValue = '';
    // if itemValue exist, maybe items is a array object
    if (itemValue) {
      // find value
      selectedValue = items.filter((item) => item[itemValue] === value)[0];
    } else {
      selectedValue = value;
    }
    setCurrentValue(selectedValue || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onChange = useCallback( (event) => {
      const { value } = event.target;
      setCurrentValue(value);
      // valida onChange porque puede ser undefined
      onChange !== undefined && onChange(name, itemValue ? value[itemValue] : String(value));
    },
    [itemValue, name, onChange]
  );

  return (
    <div >
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
      <FormControl sx={{ minWidth: 186 }}> 
        <InputLabel id={id}>{label}</InputLabel>  
        <Select
          inputRef={selectRef}
          // label={label ? label: null}
          id={id}
          name={name}
          variant={variant && 'filled'}
          value={currentValue}
          onChange={_onChange}
          displayEmpty
          size={size ? size:'small'}
          inputProps={{ 'aria-label': 'Without label' }}
          disabled={disabled}
          renderValue={(selected) => (itemText ? selected[itemText] : String(selected))}
        >
          {items.map((item, index) => (
            <MenuItem value={item} key={`select_item_${name}_${index}`}>
              {itemText ? item[itemText] : String(item)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={errors?.[name] && touched?.[name] && Boolean(errors[name])} style={{ marginTop: '0px' }}>
            {errors?.[name] && touched?.[name] ? errors[name] : ''}
          </FormHelperText>
      </FormControl>
    </div>
  );
};

export default React.memo(SelectFieldM);
