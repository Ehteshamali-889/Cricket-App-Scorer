import React from 'react'

import Container from '@mui/material/Container';
import AddScore from './AddScore'
import { useLocation } from 'react-router-dom'
import Header from '../Main/Header'
const ScoreScreen = () => {
  const location = useLocation()
  const { first,second } = location.state
  console.log('firstname',first);
  console.log('firstname',second);
  return (
	<div>
        <Header />
        <Container maxWidth="sm">
            <AddScore firstteam={first} secondteam={second} />
        </Container>
    </div>
  )
}

export default ScoreScreen