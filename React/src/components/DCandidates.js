import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/dCandidate';
import DCandidateForm from './DCandidateForm';

import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core';

const DCandidates = (props) => {

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])

    return (
        <Paper>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.DCandidateList.map((record, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
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
}

export default connect(mapStateToProps, mapActionToProps)(DCandidates);