import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Navbar />

        <div className="flex-grow">
          <Manager />
        </div>

        <Footer />
      </div>

    </>
  )
}

export default App
