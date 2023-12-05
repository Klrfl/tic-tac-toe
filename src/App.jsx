import Game from "./components/Game"

import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

import "./App.css"

function App() {
  return (
    <>
      <header>
        <div className="logos">
          <img
            src={reactLogo}
            className="logo logo--react"
            width="40"
            height="40"
            alt="React logo"
          />
          <img
            src={viteLogo}
            className="logo logo--vite"
            width="40"
            height="40"
            alt="Vite logo"
          />
        </div>

        <h1>React Tic Tac Toe game</h1>
        <p>
          I want to learn React so I followed their tutorial on{" "}
          <a href="https://react.dev">react.dev</a> and made this very cool
          little Tic Tac Toe game.
        </p>
      </header>
      <main>
        <Game />
      </main>
    </>
  )
}

export default App
