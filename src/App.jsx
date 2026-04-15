import Nav from './components/Nav'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Contents from './components/contents/Contents'
import Members from './components/Members'
import VMV from './components/VMV'
import Values from './components/Values'
import Platforms from './components/Platforms'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <VMV />
        <Hero />
        <Pillars />
        <Contents />
        <Members />
        <Values />
        <Platforms />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
