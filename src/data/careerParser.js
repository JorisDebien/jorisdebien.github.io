import Papa from 'papaparse'

export async function parseCareerCSV() {
  try {
    const response = await fetch('/assets/career.csv')
    const csvText = await response.text()
    
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    })

    return result.data
      .filter(row => row.Title && row.Company)
      .map((row, index) => ({
        id: index,
        title: row.Title,
        company: row.Company,
        from: row.From,
        to: row.To,
        description: row.Description || '',
      }))
  } catch (error) {
    console.error('Error parsing career CSV:', error)
    return []
  }
}
