import { Box, Typography } from '@mui/material'
import React from 'react'
import User from '../mnidashboard/page'
import BasicTable from '../table/page'

export default function Admin_Orders_Dashboard() {
  return (
    <Box>
      <Typography variant='h4' sx={{ textAlign: 'center', textDecoration: 'underline' }}>Orders Dashboard</Typography>
      <Box>
        <User />
        <Box sx={{ margin: '20px 18%',width:'80%'}}>
          <BasicTable />
        </Box>
      </Box>
    </Box>
  )
}
