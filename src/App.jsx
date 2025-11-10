import { useState } from 'react'
import './App.css'

const Symbol = ({ value, drone, checkCondition, onSelectionChangeFunction }) => {
  return (
    <span>
      <input type="radio" drone={drone} value={value} checked={checkCondition} onChange={onSelectionChangeFunction}></input>
      <img src={`./src/symbols/${value}.png`}></img>
    </span>
  )
}

const SymbolSelection = ({ variable, variableValue, values, onSelectionChangeFunction }) => {
  return (
    <fieldset>
      <legend>Select the symbol corresponding to {variable}</legend>
      {values.map((value) => (
        <Symbol key={value} value={value} drone={variable} checkCondition={value === variableValue} onSelectionChangeFunction={onSelectionChangeFunction} />
      ))}
    </fieldset>
  )
}

const SymbolSelections = () => {
  const [xValue, setXValue] = useState(null)
  const [yValue, setYValue] = useState(null)
  const [zValue, setZValue] = useState(null)

  const handleXSymbolSelectionChange = (event) => {
    setXValue(event.target.value)
  }
  const handleYSymbolSelectionChange = (event) => {
    setYValue(event.target.value)
  }
  const handleZSymbolSelectionChange = (event) => {
    setZValue(event.target.value)
  }

  const allSymbolsSelected = () => {
    return xValue !== null && yValue !== null && zValue !== null
  }
  const symbolValues = ['0', '10', '11', '20', '21', '22']
  const variables = [
    { variable: 'x', value: xValue, handler: handleXSymbolSelectionChange },
    { variable: 'y', value: yValue, handler: handleYSymbolSelectionChange },
    { variable: 'z', value: zValue, handler: handleZSymbolSelectionChange },
  ]
  const Result = () => {
    if (allSymbolsSelected()) {
      const x = parseInt(xValue)
      const y = parseInt(yValue)
      const z = parseInt(zValue)

      const first = 2 * x + 11
      const second = 2 * z + y - 5
      const third = Math.abs(y + z - x)
      return (
        <p>
          Your code is [{first}, {second}, {third}]
        </p>
      )
    } else {
      return null
    }
  }

  const reset = () => {
    setXValue(null)
    setYValue(null)
    setZValue(null)
  }

  return (
    <div>
      {variables.map(({ variable, value, handler }) => (
        <SymbolSelection key={variable} variable={variable} variableValue={value} values={symbolValues} onSelectionChangeFunction={handler} />
      ))}
      <div className="bottom-container">
        <Result />
        <button onClick={() => reset()}>Reset all</button>
      </div>
    </div>
  )
}

function App() {
  return <SymbolSelections />
}

export default App