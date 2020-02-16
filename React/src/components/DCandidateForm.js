import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputLabel, Select, FormControl, MenuItem, Button, FormHelperText } from '@material-ui/core';

import useForm from './useForm';

import * as actions from '../actions/dCandidate';
import { connect } from 'react-redux';

import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 200,
    },
    smMargin: {
        margin: theme.spacing(1),
    }
}));

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
};

function DCandidateForm(props) {
    const classes = useStyles();

    // Toast message
    const { addToast } = useToasts();

    // Validate()
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required.";
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required.";
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) && fieldValues.email ? "" : "Email is not valid.";

        setErrors({
            ...temp,
        });

        if (fieldValues === values) 
            return Object.values(temp).every(x => x === "");
    }

    // Destructure by using common input operator seperate
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId);

    // Material UI select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const onSuccess = () => {
                resetForm();
                addToast("Submitted successfully", {appearance: 'success'})
            }

            if (props.currentId === 0) {
                props.createDCandidate(values, onSuccess)
            } else {
                props.updateDCandidate(props.currentId, values, onSuccess)
            }
        }
    };

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.DCandidateList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <div>
            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && {error: true, helperText: errors.fullName})}
                        ></TextField>
                        <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                        ></TextField>
                        <FormControl 
                        variant="outlined" 
                        className={classes.formControl}
                        {...(errors.bloodGroup && {error: true})}

                        >
                            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                            <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                <MenuItem value="A+">A +</MenuItem>
                                <MenuItem value="A-">A -</MenuItem>
                                <MenuItem value="B+">B +</MenuItem>
                                <MenuItem value="B-">B -</MenuItem>
                                <MenuItem value="AB+">AB +</MenuItem>
                                <MenuItem value="AB-">AB -</MenuItem>
                                <MenuItem value="O+">O +</MenuItem>
                                <MenuItem value="O-">O -</MenuItem>
                            </Select>
                            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && {error: true, helperText: errors.mobile})}
                        ></TextField>
                        <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        ></TextField>
                        <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        ></TextField>
                        <div>
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                            >
                                Submit
                            </Button>
                            <Button
                            variant="contained"
                            color="default"
                            className={classes.smMargin}
                            onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    DCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DCandidateForm);