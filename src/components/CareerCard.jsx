import React from 'react'
import styles from './CareerCard.module.css'

function CareerCard({ title, company, from, to, description, isOpen, onToggle }) {
  return (
    <article className={styles.card}>
      <button
        className={styles.cardHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{title} at {company}</h3>
          <p className={styles.subtitle}>{from} - {to}</p>
        </div>
      </button>
      {isOpen && (
        <div className={styles.content}>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </article>
  )
}

export default CareerCard
