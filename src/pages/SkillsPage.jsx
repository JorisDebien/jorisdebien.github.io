import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SkillCard from '../components/SkillCard'
import { parseSkillsCSV } from '../data/skillsParser'
import styles from './SkillsPage.module.css'

function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [openCards, setOpenCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      const data = await parseSkillsCSV()
      setSkills(data)
      setLoading(false)
    }
    loadSkills()
  }, [])

  const toggleCard = (id) => {
    setOpenCards(prev =>
      prev.includes(id)
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    )
  }

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link to="/" className={styles.backLink}>
          ← Home
        </Link>

        <h1 className={styles.pageTitle}>Skills</h1>

        <section className={styles.cardsSection}>
          {skills.length === 0 ? (
            <p>No skills found.</p>
          ) : (
            skills.map(skillData => (
              <SkillCard
                key={skillData.id}
                skill={skillData.skill}
                description={skillData.description}
                isOpen={openCards.includes(skillData.id)}
                onToggle={() => toggleCard(skillData.id)}
              />
            ))
          )}
        </section>
      </div>
    </main>
  )
}

export default SkillsPage
