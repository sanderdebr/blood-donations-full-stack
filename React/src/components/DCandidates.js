import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/dCandidate';
import DCandidateForm from './DCandidateForm';

import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useToasts } from 'react-toast-notifications';

const styles = theme => ({
    root: {
        '& .MuiTableCell-head': {
            fontWeight: 'bold'
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const DCandidates = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])

    const { addToast } = useToasts();

    const onDelete = id => {
        console.log('test');
        if (window.confirm('Are you sure to delete this record?'))
        props.deleteDCandidate(id, () => addToast("Deleted successfully", {appearance: 'info'}))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({currentId, setCurrentId})} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.DCandidateList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon onClick={() => setCurrentId(record.id)} color="primary"></EditIcon></Button>
                                                        <Button><DeleteIcon onClick={() => onDelete(record.id)} color="secondary"></DeleteIcon></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
};

const mapStateToProps = state => ({
    DCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));