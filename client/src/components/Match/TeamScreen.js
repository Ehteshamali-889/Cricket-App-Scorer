import React from 'react'
import Header from '../Main/Header'
import Container from '@mui/material/Container';

import { useLocation } from 'react-router-dom'
import ViewPlayer from './ViewPlayer'
const TeamScreen = () => {
  const location = useLocation()
  const { first,second } = location.state
  console.log('firstname',first);
  console.log('firstname',second);
  return (
	<div>
        <Header />
        <Container maxWidth="sm">
            <ViewPlayer />
        </Container>
    </div>
  )
}

export default TeamScreen