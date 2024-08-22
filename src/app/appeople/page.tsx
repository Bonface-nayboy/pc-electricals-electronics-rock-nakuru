"use client";

import {
  Box, Button, Card, CardMedia, Grid, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
  Select, InputLabel, MenuItem
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../mnidashboard/page';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

interface Users {
  _id: string;
  username: string;
  email: string;
  password: string;
  group: string;
}

const columns = [
  { name: 'USERNAME', uid: 'username' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'GROUP', uid: 'group' },
  { name: 'ACTIONS', uid: 'actions' }
];

export default function People() {
  const [users, setUsers] = useState<Users[]>([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const [passwordVisible, setPasswordVisible] = useState<{ [key: string]: boolean }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [editPassword, setEditPassword] = useState('');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('api/adminusers');
      const usersArray = Array.isArray(response.data.data) ? response.data.data : [];
      setUsers(usersArray);
    } catch (error) {
      console.error('Error fetching the users', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('api/adminusers', { username, email, password, group });
      resetUserFields();
      fetchData();
    } catch (error) {
      console.error('Error adding the user', error);
    }
  };

  const resetUserFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setGroup('');
  };

  const handlePasswordVisibility = (userId: string) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setConfirmPassword('');
  };

  const handleConfirmPassword = () => {
    if (confirmPassword === 'adminpassword' && selectedUserId) {
      setPasswordVisible((prev) => ({ ...prev, [selectedUserId]: true }));
    }
    handleDialogClose();
  };

  const handleChangeGroup = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroup(event.target.value as string);
  };

  const openDeleteDialog = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`/api/adminusers?id=${userToDelete}`);
        fetchData();
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting the user', error);
      }
    }
  };

  const openEditDialog = (user: Users) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setPassword('');
    setGroup(user.group);
    setEditPassword('');
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    resetUserFields();
  };

  const handleSaveEdit = async () => {
    if (selectedUser) {
      try {
        await axios.put(`api/adminusers`, {
          _id: selectedUser._id,
          username: username || selectedUser.username,
          email: email || selectedUser.email,
          password: editPassword || selectedUser.password,
          group: selectedUser.group
        });
        fetchData();
        handleEditDialogClose();
      } catch (error) {
        console.error('Error updating the user', error);
      }
    }
  };

  return (
    <>
      <User />
      <Box sx={{ margin: { xs: '10px', sm: '20px 18%' } }}>
        <Typography variant="h4" sx={{ textAlign: 'center', textDecoration: 'underline', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Account Users
        </Typography>
        <Card sx={{ margin: { xs: '10px', sm: '20px' } }}>
          <CardMedia sx={{ display: 'block' }}>
            <Box sx={{ margin: '10px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    autoFocus
                    type="text"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="group-select-label">User Group</InputLabel>
                    <Select
                      labelId="group-select-label"
                      id="group-select"
                      value={group}
                      onChange={handleChangeGroup}
                      label="User Group"
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="General User">General User</MenuItem>
                      <MenuItem value="Supervisor">Supervisor</MenuItem>
                      <MenuItem value="Cashier">Cashier</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Button onClick={handleAddUser} variant="contained" sx={{ margin: '10px', width: { xs: '100%', md: 'auto' } }}>
              <Add />Add User
            </Button>
          </CardMedia>
        </Card>
        <Typography variant="h5" sx={{ textAlign: 'center', textDecoration: 'underline', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          System Users
        </Typography>
        <Paper sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.uid} sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{user.username}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{user.email}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{user.group}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                      <Tooltip title="Edit User" arrow>
                        <Button color="primary" onClick={() => openEditDialog(user)}><Edit /></Button>
                      </Tooltip>
                      <Tooltip title="Delete User" arrow>
                        <Button color="error" onClick={() => openDeleteDialog(user._id)}><Delete /></Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the admin password to view the user's password.
          </DialogContentText>
          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmPassword} variant="contained" color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="edit-email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="edit-password"
            label="Password"
            type="password"
            fullWidth
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
