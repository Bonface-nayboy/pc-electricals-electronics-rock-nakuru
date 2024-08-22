import { useAuth } from '@/context/AuthContext/page';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const { loginAsAdmin } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/adminusers/login', {
        username,
        password,
      });

      if (response.data.success) {
        loginAsAdmin();
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        width: { xs: '90%', sm: '60%', md: '35%' }, 
        margin: { xs: '10% auto', sm: '8% auto', md: '10% auto' },
        padding: { xs: '10px', sm: '20px' },
      }}
    >
      <Card>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            borderRadius: '50%',
            overflow: 'hidden',
            width: { xs: 120, sm: 150, md: 170 },
            margin: '0 auto',
          }}
        >
          <Image 
            src="https://th.bing.com/th/id/OIP.5_t6soUGUv--GBZl2IdEuAHaFO?w=297&h=209&c=7&r=0&o=5&pid=1.7"
            alt="Profile"
            width={200}
            height={150}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <Box sx={{ padding: { xs: '0 5%', sm: '0 10%' } }}>
          <form onSubmit={handleLoginSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  placeholder="Username"
                  value={username}
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" type="submit" fullWidth>
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginForm;
