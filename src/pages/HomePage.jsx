import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {/* Headshot */}
        <div className={styles.headshotSection}>
          <img 
            src="/assets/headshot.svg" 
            alt="Joris Debien" 
            className={styles.headshot}
          />
        </div>

        {/* Name */}
        <h1 className={styles.name}>Joris Debien</h1>

        {/* Social Links */}
        <nav className={styles.socialLinks}>
          <a 
            href="https://www.linkedin.com/in/jorisdebien/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
          >
            <img 
              src="/public/assets/linkedin-logo.svg" 
              alt="LinkedIn" 
              className={styles.logo}
            />
          </a>
          <a 
            href="https://github.com/JorisDebien/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit GitHub"
          >
            <img 
              src="/public/assets/github-logo.svg" 
              alt="GitHub" 
              className={styles.logo}
            />
          </a>
        </nav>

        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <Link to="/career" className={styles.navButton}>
            View Career
          </Link>
          <Link to="/skills" className={styles.navButton}>
            View Skills
          </Link>
        </nav>
      </div>
    </main>
  )
}

export default HomePage
