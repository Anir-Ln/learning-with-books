import React from 'react'
import {useRef} from 'react'

const PhraseForm = ({phrase, context, onSavePhrase}) => {
  const meaning = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(meaning.current.value);
    onSavePhrase(phrase, context, meaning.current.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phrase: {phrase}
      </label>
      <br/>
      <label>
        Context: {context}
      </label>
      <br/>
      <label>
        Meaning:
        <input type="textarea" name="meaning" ref={meaning}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default PhraseForm