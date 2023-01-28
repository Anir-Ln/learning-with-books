import React from 'react'
import {useRef} from 'react'

import './phrase_form_styles.css'

const PhraseForm = ({phrase, context, onSavePhrase}) => {
  const meaningRef = useRef()
  const typeRef = useRef()
  const levelRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    meaningRef.current.value = "" 
    typeRef.current.value = "" 
    levelRef.current.value = "" 
    onSavePhrase(phrase, context, meaningRef.current.value)
  }

  const phraseStyles = {
    fontWeight: 500,
    backgroundColor: 'bisque',
    padding: 2,
    display: 'block',
    marginTop: 2
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className='element'>
        Phrase: <span style={phraseStyles}>{phrase}</span>
      </label>
      <label className='element'>
        Context: <span style={phraseStyles}>{context}</span>
      </label>
      <label className='element'>
        Meaning:
        <textarea type="text" name="meaning" ref={meaningRef}/>
      </label>
      <label className='element'>
        Type:
        <input type="text" name="type" ref={typeRef}/>
      </label>
      <label className='element'>
        Level of knowledge:
        <select ref={levelRef}>
          <option value="">Select level of knowledge</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default PhraseForm