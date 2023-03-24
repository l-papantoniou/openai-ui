import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const CustomSelect = ({label, options, value, onChange}) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState(value);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={label}
                value={selectedValue}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;