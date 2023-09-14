import React from 'react'
import styles from '../../styles/Home.module.css'
import BG from '../../images/computer.png'

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>The bestseller of 2023</div>
          <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TIf</h1>
          <button className={styles.button}>Shop now</button>
        </div>
        <div className={styles.image}>
          <img src={BG} alt='Computer'/>
        </div>
      </div>

    </section>
  )
}

export default Poster