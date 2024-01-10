import { useState } from 'react'
import Bill from './Bill'
import Payment from './Payment'

const App = function () {
  const [inputValue, setInputValue] = useState('')
  return (
    <>
      <Bill />
      <Payment />
    </>
  )
}

export default App
