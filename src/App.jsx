import favicon from '/favicon.png'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header image={favicon} />
      <Container />
      <Footer year={currentYear}/>
    </>
  )
}

export default App
