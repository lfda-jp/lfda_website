import Nav from './components/Nav'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Contents from './components/contents/Contents'
import Members from './components/Members'
import Values from './components/Values'
import Platforms from './components/Platforms'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Reveal from './components/Reveal'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal><Pillars /></Reveal>
        <Reveal><Contents /></Reveal>
        <Reveal><Members /></Reveal>
        <Reveal><Values /></Reveal>
        <Reveal><Platforms /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </>
  )
}
