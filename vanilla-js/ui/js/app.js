import { fetchNui, isEnvBrowser, DEV_MODE } from "./utils.js";
var gksphoneFunctions = null;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.gksphone) {
            gksphoneFunctions = window.gksphone;
            var darkCheck = window.gksphone.isDarkMode();
            if (darkCheck) {
                document.body.classList.add("dark");
                let darkModeCheck = document.getElementById("isDarkMode");
                if (!darkModeCheck) return
                darkModeCheck.innerHTML = "On"
            } else {
                document.body.classList.remove("dark");
                let darkModeCheck = document.getElementById("isDarkMode");
                if (!darkModeCheck) return
                darkModeCheck.innerHTML = "Off"
            }
        }
        fetchNui("dataCheck", { id: 1 });
    }, 100);
});

window.addEventListener('message', (event) => {
    const e = event.data
    console.log(JSON.stringify(e));
    if (e.type === 'emojiSelected') {
        gksphoneFunctions?.notify(`Emoji selected: ${e.eventData}`, 2000)
    }
})

async function OpenCamera() {
    var isPhoto = true
    var isVideo = true
    const photoLink = await gksphoneFunctions.CameraOpen(isPhoto, isVideo)
    if (photoLink) {
        let img = document.getElementById("img");
        img.src = photoLink
        img.style.display = "block";
    }
}

document.getElementById('openCamera').onclick = async () => {
    OpenCamera()
}

document.getElementById('OpenGallery').onclick = async () => {
    var onlyVideo = false
    var onlyPhoto = true
    var multiSelect = false
    var camera = true
    const selectGallery = await gksphoneFunctions.GetGallery(onlyVideo, onlyPhoto, multiSelect, camera)  
    if (selectGallery) {
        if (selectGallery.opencamera) {
            OpenCamera()
        } else {
            let img = document.getElementById("#img");
            img.src = selectGallery.data
            img.style.display = "block";
        }
    }
}

document.getElementById('ExampleLoadingPoup').onclick = () => {
    console.log('Loading popup');
    
    gksphoneFunctions?.loadingPopup('Loading...')
    setTimeout(() => {
        gksphoneFunctions?.closeLoadingPopup()
    }, 2000)
}

document.getElementById('ExampleNotify').onclick = () => {
    console.log('Notify');
    gksphoneFunctions?.notify('Hello world', 2000)
}

document.getElementById('ExampleCalling').onclick = () =>  {
    const number = document.getElementById('number').value
    console.log('Calling', number);
    if (!number) {
        gksphoneFunctions?.notify('Please enter a number', 2000)
        return
    }
    gksphoneFunctions?.calling(number, false)
}

document.getElementById('ExampleVideoCall').onclick = () =>   {
    const number = document.getElementById('number').value
    console.log('Video Call', number);
    if (!number) {
        gksphoneFunctions?.notify('Please enter a number', 2000)
        return
    }
    gksphoneFunctions?.videoCall(number)
}

document.getElementById('ExampleEmoji').onclick = () => {
    gksphoneFunctions.SelectEmoji(true)
}

document.getElementsByTagName('input').focus = () => {
    gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: false})
}

document.getElementsByTagName('input').blur = () => {
    gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: true})
}


const allInputs = document.getElementsByTagName('input');
for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('focus', function(event) {
        gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: false})
    });
    
    allInputs[i].addEventListener('blur', function(event) {
        gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: true})
    });
}