import React, { useState, useContext, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Input, Button, Card, CardContent, TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload, UpdateMeInput, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import { Link } from 'react-router-dom';

const UserMeLayout = () => {
  const { state } = useContext(UserContext)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>ユーザー情報</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell align="right" style={{ border: 'none' }}>ユーザー名</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>{state.user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" style={{ border: 'none' }}>ユーザーID</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>{state.user?.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">権限</TableCell>
            <TableCell align="left">{state.user?.role.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>公開情報</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right" style={{ border: 'none' }}>好きなアーティスト</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>公開する</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">好きなアルバム</TableCell>
            <TableCell align="left">公開する</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button component={Link} to={"/me/edit"} variant="contained">変更する</Button>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default UserMeLayout
