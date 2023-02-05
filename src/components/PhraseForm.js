import React from 'react'
import {useRef} from 'react'

import './phrase_form_styles.css'

const PhraseForm = ({text, context, onSavePhrase}) => {
  const meaningRef = useRef("")
  const typeRef = useRef()
  const levelRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    onSavePhrase({
      text, 
      // context, 
      "meaning": meaningRef.current.value,
      "learning_level_id": levelRef.current.value, 
      "phrase_type_id": typeRef.current.value,
    })

    // reset form
    e.target.reset()
    // console.log(e.target);
    meaningRef.current.value = "" 
  }

  const textStyles = {
    fontWeight: 500,
    backgroundColor: 'bisque',
    padding: 2,
    display: 'block',
    marginTop: 2
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className='element'>
        Text: <span style={textStyles}>{text}</span>
      </label>
      {/* <label className='element'>
        Context: <span style={textStyles}>{context}</span>
      </label> */}
      <label className='element'>
        Meaning:
        <textarea type="text" name="meaning" ref={meaningRef}/>
      </label>
      <label className='element'>
        Type:
        <select ref={typeRef}>
          <option value="">Select phrase type</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>      </label>
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