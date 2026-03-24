import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import washuLogo from './assets/washu.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://washu.edu" target="_blank" rel="noreferrer">
          <img src={washuLogo} className="logo washu" alt="WashU logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WashU + Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WashU, Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
