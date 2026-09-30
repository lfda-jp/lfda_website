import Nav from './components/Nav'
import Hero from './components/Hero'
import VMV from './components/VMV'
import Pillars from './components/Pillars'
import Contents from './components/contents/Contents'
import Members from './components/Members'
import Activities from './components/Activities'
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
        {/* About */}
        <Hero />
        <Reveal><VMV /></Reveal>
        <Reveal><Values /></Reveal>
        {/* Contents */}
        <Reveal><Pillars /></Reveal>
        <Reveal><Contents /></Reveal>
        <Reveal><Platforms /></Reveal>
        {/* Team */}
        <Reveal><Members /></Reveal>
        <Reveal><Activities /></Reveal>
        {/* Contact */}
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </>
  )
}
