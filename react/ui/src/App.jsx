import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gksphoneFunctions, setGksphoneFunctions] = useState(null);
  const [isDarkMode, setMode] = useState(false);
  const [number, setNumber] = useState('');

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
      
  });

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  function ExampleLoadingPoup () {
    console.log('Loading popup');
    console.log(gksphoneFunctions);
    
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
  
  async function InputBlur ()  {
    if (!window.invokeNative) return;
  
    const data = {
      value: true,
    };
  
    await fetchNui("input", data);
  }
  
  async function InputFocus ()  {
    if (!window.invokeNative) return;
  
    const data = {
      value: false,
    };
  
    await fetchNui("input", data);
  }

  async function fetchNui  (evName, data, mockData = null)  {
    if (!window.invokeNative) return mockData;
    const rawResp = await fetch(`https://gks-customapp/${evName}`, {
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


          <div>
            Dark mode: {isDarkMode} 
          </div>
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
        </div>
    </>
  )
}

export default App
