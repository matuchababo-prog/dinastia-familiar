import { FamilyGraphEngine } from './components/FamilyGraphEngine'
import { FamilyUserProvider } from './context/FamilyUserContext'

function App() {
  return (
    <FamilyUserProvider>
      <FamilyGraphEngine />
    </FamilyUserProvider>
  )
}

export default App
