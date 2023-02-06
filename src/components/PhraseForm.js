import React, { useEffect } from 'react'
import {useState} from 'react'

import './phrase_form_styles.css'

const PhraseForm = ({phrase, context, onSavePhrase}) => {
  const [formData, setFormData] = useState(phrase)

  useEffect(() => {
    setFormData(phrase)
  }, [phrase])

  const handleSubmit = (e) => {
    e.preventDefault()

    onSavePhrase(formData)

    // reset form
    e.target.reset()
    // console.log(e.target);
    setFormData({})
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
        Text: <span style={textStyles}>{formData?.text}</span>
      </label>
      {/* <label className='element'>
        Context: <span style={textStyles}>{context}</span>
      </label> */}
      <label className='element'>
        Meaning:
        <textarea type="text" name="meaning" value={formData?.meaning} onChange={e => setFormData({meaning: e.target.value, ...formData})}/>
      </label>
      <label className='element'>
        Type:
        <select value={formData?.phrase_type_id} onChange={e => setFormData({phrase_type_id: e.target.value, ...formData})}>
          <option value="">Select phrase type</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>      </label>
      <label className='element'>
        Level of knowledge:
        <select value={formData?.learning_level_id} onChange={e => setFormData({learning_level_id:e.target.value, ...formData})}>
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