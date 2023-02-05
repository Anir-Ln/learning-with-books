import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [lang, setLang] = useState('english')

  let langs = ['english', 'french', 'german']
  let booksNames = [
    'Freud_ A Very Short Introduction (Very Short Introductions)',
    'Democracy_ A Very Short Introduction (Very Short Introductions)',
    'FRIEDRICH NIETZSCHE_ On the Genealogy of Morality',
    'Geopolitics_ A Very Short Introduction (Very Short Introductions)',
    'Freud_ A Very Short Introduction (Very Short Introductions)',
    'Democracy_ A Very Short Introduction (Very Short Introductions)',
    'FRIEDRICH NIETZSCHE_ On the Genealogy of Morality',
    'Geopolitics_ A Very Short Introduction (Very Short Introductions)',
    'Freud_ A Very Short Introduction (Very Short Introductions)',
    'Democracy_ A Very Short Introduction (Very Short Introductions)',
    'FRIEDRICH NIETZSCHE_ On the Genealogy of Morality',
    'Geopolitics_ A Very Short Introduction (Very Short Introductions)',
  ]

  useEffect(() => {
    // @todo langs from api
  })

  useEffect(() => {
    // @todo books names from api    
  }, [lang])

  const handleLangChange = (e) => {
    setLang(e.target.value)
  }

  return (
    <div>
      <label>
        Lang:
        <select onChange={handleLangChange} value={lang}>
          {
            langs.map(lang => 
              <option value={lang}>{lang}</option>
            )
          }
        </select>
      </label>

      <h3>Books</h3>
      <ul>
        {booksNames.map((bookName, index) => (
          <li key={index}>
            <Link to={`/read/${lang}/${bookName}`}>{bookName}</Link>
          </li>
        ))} 
      </ul>
    </div>
  )
}

export default Dashboard