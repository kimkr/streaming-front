'use client'

import React, { useEffect } from 'react';
import { anonymousSignIn } from './lib/auth';
import { navigate } from './actions'
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    anonymousSignIn().then(() => navigate());
  }, [])

  return (
    <main className={styles.main}>
      <span>LOADING...</span>
    </main>
  )
}
