import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CareerCard from '../components/CareerCard'
import { parseCareerCSV } from '../data/careerParser'
import styles from './CareerPage.module.css'

function CareerPage() {
  const [careers, setCareers] = useState([])
  const [openCards, setOpenCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCareers = async () => {
      const data = await parseCareerCSV()
      setCareers(data)
      setLoading(false)
    }
    loadCareers()
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

        <h1 className={styles.pageTitle}>Career</h1>

        <section className={styles.cardsSection}>
          {careers.length === 0 ? (
            <p>No career entries found.</p>
          ) : (
            careers.map(career => (
              <CareerCard
                key={career.id}
                title={career.title}
                company={career.company}
                from={career.from}
                to={career.to}
                description={career.description}
                isOpen={openCards.includes(career.id)}
                onToggle={() => toggleCard(career.id)}
              />
            ))
          )}
        </section>
      </div>
    </main>
  )
}

export default CareerPage
