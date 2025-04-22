import { useState } from 'react'
import Header from './components/Header'
import AgeCalculator from './components/AgeCalculator'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
      <div className="app-container">
        <Header />
        <main>
          <AgeCalculator />
        </main>
        <Footer />
      </div>
  )
}

export default App