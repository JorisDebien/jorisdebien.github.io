import React from 'react'
import styles from './SkillCard.module.css'

function SkillCard({ skill, description, isOpen, onToggle }) {
  return (
    <article className={styles.card}>
      <button
        className={styles.cardHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className={styles.title}>{skill}</h3>
      </button>
      {isOpen && description && (
        <div className={styles.content}>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </article>
  )
}

export default SkillCard
