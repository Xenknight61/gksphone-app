import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gksphoneFunctions, setGksphoneFunctions] = useState(null);
  const [isDarkMode, setMode] = useState(false);
  const [number, setNumber] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    console.log('App mounted');
    setTimeout(() => {
        if (window.gksphone) {
            console.log("GKSPhone functions loaded");
            setGksphoneFunctions(window.gksphone);
            var darkCheck = window.gksphone.isDarkMode();
            if (darkCheck) {
                setMode(true);
                document.body.classList.add("dark");
            } else {
                setMode(false);
                document.body.classList.remove("dark");
            }
            console.log("GKSPhone functions loaded", isDarkMode);
        }
        fetchNui("dataCheck", { id: 1 });
    }, 100);

  }, []);

  window.addEventListener('message', (event) => {
      if (!event.data) return;
      const e = event.data
      console.log(e);
      if (e.type === 'emojiSelected') {
          gksphoneFunctions?.notify(`Emoji selected: ${e.eventData}`, 2000)
      }
  });

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  function ExampleLoadingPoup () {
    console.log('Loading popup');    
    gksphoneFunctions?.loadingPopup('Loading...')
    setTimeout(() => {
      gksphoneFunctions?.closeLoadingPopup()
    }, 2000)
  }
  
  function ExampleNotify ()  {
    console.log('Notify');
    gksphoneFunctions?.notify('Hello world', 2000)
  }
  
  function ExampleCalling ()  {
    console.log('Calling', number);
    if (!number) {
      gksphoneFunctions?.notify('Please enter a number', 2000)
      return
    }
    gksphoneFunctions?.calling(number, false)
  }
  
  function ExampleVideoCall ()  {
    console.log('Video Call', number);
    if (!number) {
      gksphoneFunctions?.notify('Please enter a number', 2000)
      return
    }
    gksphoneFunctions?.videoCall(number)
  }
  
  function InputBlur ()  {
    gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: true})
  }
  
  function InputFocus ()  {
    gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: false})
  }

  async function OpenCamera ()  {
    var isPhoto = true
    var isVideo = true
    const photoLink = await gksphoneFunctions.CameraOpen(isPhoto, isVideo)
    if (photoLink) {
      setImageURL(photoLink)
    }
  }

  function ImageViewer () {
    if (!imageURL) return;
    gksphoneFunctions.FullScreenImage(imageURL)
  }

  async function OpenGallery () {
    var onlyVideo = false
    var onlyPhoto = true
    var multiSelect = false
    var camera = true
    const selectGallery = await gksphoneFunctions.GetGallery(onlyVideo, onlyPhoto, multiSelect, camera)  
    if (selectGallery) {
      if (selectGallery.opencamera) {
        OpenCamera()
      } else {
        setImageURL(selectGallery.data)
      }
    }
  }

  function ExampleEmoji () {
    gksphoneFunctions.SelectEmoji(true)
  }

  async function fetchNui  (evName, data, mockData = null)  {
    if (!window.invokeNative) return mockData;
    const fetchLink = window.gksphone?.url ? "https://"+window.gksphone.url : "https://react";
    const rawResp = await fetch(`${fetchLink}/${evName}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF8",
      },
      method: "POST",
    });
  
    return await rawResp.json();
  };

  return (
    <>
        <div className="app-container">
          <div className="app-header">
            <h1>
              GKSPhone React Example
            </h1>

            <p>
              This is an example of how to use GKSPhone functions in React.
            </p>

          </div>
          {imageURL !== '' ? <img className="image-preview" src={imageURL} alt="" height="150" onClick={ImageViewer} /> : null}
          <div>
            Dark mode: {isDarkMode ? 'On' : 'Off'}
          </div>
          <button onClick={OpenCamera}>
            Open Camera
          </button>
          <button onClick={OpenGallery}>
            Gallery poupup
          </button>
          <button onClick={ExampleLoadingPoup}>
            Loading popup
          </button>
          <button onClick={ExampleNotify}>
            Notify
          </button>
          <button onClick={ExampleCalling}>
            Calling
          </button>
          <button onClick={ExampleVideoCall}>
            Video call
          </button>
          <input type="text" placeholder="Number" onChange={handleChange} value={number}  onBlur={InputBlur} onFocus={InputFocus}/>
          <button onClick={ExampleEmoji}>
          Emoji
          </button>
        </div>
    </>
  )
}

export default App
