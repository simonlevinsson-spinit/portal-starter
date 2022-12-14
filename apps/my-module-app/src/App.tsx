
import './App.css'
import { AppShell } from 'shell'
import { CoolModule } from './CoolModule'

function App() {
  return (
    <AppShell moduleDefinitions={[CoolModule]} />
  )
}

export default App
