import { useState, useEffect } from "react";


export function Meme() {
  const API = "https://api.imgflip.com/get_memes"

  const [memes, setMemes] = useState({
    topText: "",
    bottomText: "",
    imageUrl: ""
  })

  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    async function getMemes() {
      const res = await fetch(API)
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])
  
  function randomMeme() {
    const randomNumber = Math.floor(Math.random() * allMemes.length - 1)
    const url = allMemes[randomNumber].url
    setMemes(prev => ({
      ...prev,
      imageUrl: url
    }))
  }

  function handleChange(e) {
    const {name, value} = e.target
    setMemes(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <main className="form">
      <div>
      <input 
        type="text" 
        name="topText"
        value={memes.topText}
        aria-label="Top Text"
        onChange={handleChange}
      />
      <input 
        type="text" 
        name="bottomText"
        value={memes.bottomText}
        aria-label="Bottom Text"
        onChange={handleChange}
      />
      <button onClick={randomMeme}>Get a new meme image</button>
    </div>
      <div className="meme-description">
        <img src={memes.imageUrl} alt="" />
          <h2 className="text topText">{memes.topText}</h2>
          <h2 className="text bottomText">{memes.bottomText}</h2>
      </div>
    </main>
  )
}