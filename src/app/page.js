"use client"
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const App = () => {

  const router = useRouter();

  const handleViewDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className={styles.landingWrapper}>
      <div className={styles.landingHero}>
        <Typography variant='h3' className={styles.landingH3}>A dashboard for currency exchange rates</Typography>
        <Typography variant='h4' className={styles.landingH4} gutterBottom>USD | CAD | EUR</Typography>
        <Button variant='outlined' size='large' color='info' onClick={handleViewDashboard}>VIEW DASHBOARD</Button>
      </div>
    </div>
  );
};

export default App;
