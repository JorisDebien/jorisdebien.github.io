import Papa from 'papaparse'

export async function parseSkillsCSV() {
  try {
    const response = await fetch('/assets/skills.csv')
    const csvText = await response.text()
    
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      delimiter: ';'
    })

    return result.data
      .filter(row => row.Skills && row.Skills.trim())
      .map((row, index) => ({
        id: index,
        skill: row.Skills.trim(),
        description: row.Description ? row.Description.trim() : ''
      }))
  } catch (error) {
    console.error('Error parsing skills CSV:', error)
    return []
  }
}
