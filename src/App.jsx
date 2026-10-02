import { useState, useRef, useMemo } from 'react'
import './App.css'

const src = (n) => `${import.meta.env.BASE_URL}images/${n}`

/* Shows the image if the file exists; otherwise a labelled placeholder
   (or nothing, for pure decorations) so you can see which file to add. */
function Img({ name, className = '', alt = '', quiet = false }) {
  const [bad, setBad] = useState(false)
  if (bad) return quiet ? null : <div className={`ph ${className}`}>add<br />{name}</div>
  return <img className={className} src={src(name)} alt={alt} draggable="false" onError={() => setBad(true)} />
}

const COLORS = ['#e8453c', '#f5b700', '#2f7fd6', '#7b3fb8', '#27a36b', '#ff7eb6']
function Confetti() {
  const bits = useMemo(() => Array.from({ length: 70 }, () => ({
    left: Math.random() * 100, delay: Math.random() * 6, dur: 5 + Math.random() * 5,
    c: COLORS[Math.floor(Math.random() * COLORS.length)], s: 4 + Math.random() * 5,
  })), [])
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={{
          left: `${b.left}%`, width: b.s, height: b.s * 1.6, background: b.c,
          animationDelay: `-${b.delay}s`, animationDuration: `${b.dur}s`
        }} />
      ))}
    </div>
  )
}

function Frame({ children, confetti = false, className = '', onBack }) {
  return (
    <div className={`frame ${className}`}>
      <div className="paper-grid">
        {confetti && <Confetti />}
        {children}
      </div>
      <Img name="star-blue.png" className="deco d-star" quiet />
      <Img name="web.png" className="deco d-web" quiet />
      <Img name="sparkle.png" className="deco d-spark" quiet />
      {onBack && <Back onClick={onBack} />}
    </div>
  )
}

function Back({ onClick }) {
  return <button className="back" onClick={onClick} aria-label="Go back">←</button>
}

/* ---------- screens ---------- */
function Landing({ onContinue }) {
  return (
    <div className="landing">
      <Img name="star-denim.png" className="deco l-star1" quiet />
      <Img name="star-denim.png" className="deco l-star2" quiet />
      <Img name="star-white.png" className="deco l-star3" quiet />
      <Img name="camera.png" className="deco l-camera" quiet />
      <div className="title-wrap">
        <Img name="title.png" className="title-img" alt="Happy Boyfriend's Day" quiet />
        <h1 className="title-text">HAPPY<br />BOYFRIEND’S<br /><span>♡ DAY ♡</span></h1>
        <button className="pill" onClick={onContinue}>CONTINUE</button>
      </div>
    </div>
  )
}

function Ask({ onYes, onNo, onBack }) {
  return (
    <Frame confetti onBack={onBack}>
      <div className="center">
        <h2 className="ask-title"><em>PLEASE</em> ACCEPT THE GIFT</h2>
        <Img name="happy yes.png" className="mascot" alt="" />
        <div className="row">
          <button className="btn" onClick={onYes}>YES</button>
          <button className="btn" onClick={onNo}>NO</button>
        </div>
      </div>
    </Frame>
  )
}

function Sad({ onBack }) {
  return (
    <Frame onBack={onBack}>
      <div className="center">
        <h2 className="ask-title"><em>WHY</em> DID YOU CLICK NO!</h2>
        <Img name="sadyes.png" className="mascot" alt="" />
        <div className="row"><button className="btn" onClick={onBack}>TRY AGAIN</button></div>
      </div>
    </Frame>
  )
}

function Choose({ open, onBack }) {
  return (
    <Frame onBack={onBack}>
      <div className="choose">
        <h2 className="choose-title">Choose Your Gifts</h2>
        <div className="gifts">
          <button className="gift-btn" onClick={() => open('letter')} aria-label="Open the letter">
            <Img name="letter.png" className="gift-img" alt="Letter" />
          </button>
          <button className="gift-btn" onClick={() => open('flower')} aria-label="Open the flowers">
            <Img name="flowers.png" className="gift-img big" alt="Flowers" />
          </button>
          <button className="gift-btn" onClick={() => open('gift')} aria-label="Open the gift">
            <Img name="giftbox.png" className="gift-img" alt="Gift" />
          </button>
        </div>
      </div>
    </Frame>
  )
}

function Polaroid({ file, cls }) {
  return <figure className={`pol ${cls}`}><Img name={file} alt="Us" /></figure>
}

function Letter({ close }) {
  return (
    <Frame className="modal" onBack={close}>
      <div className="letter-layout">
        <div className="pcol pcol-l">
          <Polaroid file="photo1.jpg" cls="r-l1" />
          <Polaroid file="photo.png" cls="r-l2" />
        </div>
        <article className="letter">
          <Img name="paperclip.png" className="clip" quiet />
          <p className="hello">Happy Boyfriend’s Day, Vishal ❤️</p>
          <p>I love you so so much and you genuinely are one of the most precious people in my life. I really hope I get to stay by your side for the rest of my life.</p>
          <p>I believe in you a lot and I know you have so much potential. I truly appreciate how hardworking you are and all the efforts you put in. I know you’ll keep improving and one day reach great heights, and I hope I’m always there to see you achieve everything you dream of. I’ll always be proud of you and believe in you.</p>
          <p>I just hope you always feel happy, loved, respected and secure. I pray you always stay healthy, peaceful and surrounded by people who genuinely care about you.</p>
          <p>I love you so much, Vishal. I’m really grateful to have you in my life and I hope we keep growing together and making so many more memories. ❤️</p>
        </article>
        <div className="pcol pcol-r">
          <Polaroid file="photo2.jpg" cls="r-r1" />
          <Polaroid file="photo4.jpg" cls="r-r2" />
        </div>
      </div>
    </Frame>
  )
}

function Flower({ close }) {
  return (
    <Frame className="modal" onBack={close}>
      <div className="flower-layout">
        <h2 className="hand">
          i have the most<br />
          handsome bf&lt;3
        </h2>
      </div>

      <Img name="hug.png" className="hug" alt="" />
      <Img name="tulips.jpg" className="tulips2" alt="Tulips" />
    </Frame>
  )
}

function GiftSlide({ close, playing, toggle }) {
  return (
    <Frame className="modal" onBack={close}>
      <div className="gift-layout">
        <div className="vinyl-card">
          <Img name="disc.png" className="vinyl" alt="And suddenly, all the love songs were about you" />
        </div>
        <Img name="gift.png" className="love-card" alt="I love you so much" />
        <div className="player">
          <Img name="love song.jpg" className="album" alt="" />
          <div className="meta"><b>Tu Hi Mera</b><span>Pritam Chakraborty</span></div>
          <button className="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? '❚❚' : '▶'}</button>
        </div>
        <Img name="disco.png" className="disco" quiet />
      </div>
    </Frame>
  )
}

/* ---------- app ---------- */
export default function App() {
  const [screen, setScreen] = useState('landing') // landing | ask | sad | choose
  const [modal, setModal] = useState(null)        // letter | flower | gift
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Called straight from the click, so the browser allows the song to start
  const openModal = async (name) => {
    setModal(name)

    if (name === 'gift' && audio.current) {
      audio.current.currentTime = 0

      try {
        await audio.current.play()
      } catch (error) {
        console.log("Audio could not play:", error)
      }
    }
  }
  const closeModal = () => {
    if (modal === 'gift') audio.current?.pause()
    setModal(null)
  }
  const toggleSong = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().catch(() => { })
    else a.pause()
  }

  return (
    <main className="app">
      <audio ref={audio} src={`${import.meta.env.BASE_URL}music/tu-hi-mera.mp3`} loop preload="auto"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {screen === 'landing' && <Landing onContinue={() => setScreen('ask')} />}
      {screen === 'ask' && <Ask onYes={() => setScreen('choose')} onNo={() => setScreen('sad')} onBack={() => setScreen('landing')} />}
      {screen === 'sad' && <Sad onBack={() => setScreen('ask')} />}
      {screen === 'choose' && <Choose open={openModal} onBack={() => setScreen('ask')} />}
      {modal === 'letter' && <div className="overlay"><Letter close={closeModal} /></div>}
      {modal === 'flower' && <div className="overlay"><Flower close={closeModal} /></div>}
      {modal === 'gift' && <div className="overlay"><GiftSlide close={closeModal} playing={playing} toggle={toggleSong} /></div>}
    </main>
  )
}
