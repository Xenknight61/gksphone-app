<script setup>
import { ref, onMounted } from 'vue';
const isDarkMode = ref(false)
const number = ref('')
const imageURL = ref('')
const backgroundColor = ref('')
var gksphoneFunctions = null

onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
          if (window.gksphone) {
              gksphoneFunctions = window.gksphone;
              var darkCheck = window.gksphone.isDarkMode();
              if (darkCheck) {
                  isDarkMode.value = true;
                  document.body.classList.add("dark");
              } else {
                  isDarkMode.value = false;
                  document.body.classList.remove("dark");
              }
          }
          fetchNui("dataCheck", { id: 1 });
      }, 100);
  });

  window.addEventListener('message', (event) => {
      if (!event.data) return;
      const e = event.data
      console.log(e);
      if (e.type === 'emojiSelected') {
        number.value += e.eventData
      }
  });
})

const ExampleLoadingPoup = () => {
  gksphoneFunctions.loadingPopup('Loading...')
  setTimeout(() => {
    gksphoneFunctions.closeLoadingPopup()
  }, 2000)
}

const ExampleNotify = () => {
  gksphoneFunctions.notify('Hello world', 2000)
}

const ExampleCalling = (anon) => {
  if (!number.value) {
    gksphoneFunctions.notify('Please enter a number', 2000)
    return
  }
  gksphoneFunctions.calling(number.value, anon)
}

const ExampleVideoCall = () => {
  if (!number.value) {
    gksphoneFunctions.notify('Please enter a number', 2000)
    return
  }
  gksphoneFunctions.videoCall(number.value)
}

const InputBlur = () => {
  gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: true})
}

const InputFocus = () => {
  gksphoneFunctions.fetchNui("gksphone:focusphone", {focus: false})
}

const OpenCamera = async () => {
  var isPhoto = true
  var isVideo = true
  const photoLink = await gksphoneFunctions.CameraOpen(isPhoto, isVideo)
  if (photoLink) {
    imageURL.value = photoLink
  }
}

const ImageViewer = () => {
  if (!imageURL.value) return;
  gksphoneFunctions.FullScreenImage(imageURL.value)
}

const OpenGallery = async () => {
  var onlyVideo = false
  var onlyPhoto = true
  var multiSelect = false
  var camera = true
  const selectGallery = await gksphoneFunctions.GetGallery(onlyVideo, onlyPhoto, multiSelect, camera)  
  if (selectGallery) {
    if (selectGallery.opencamera) {
      OpenCamera()
    } else {
      imageURL.value = selectGallery.data
    }
  }
}

const ExampleEmoji = () => {
  gksphoneFunctions.SelectEmoji(true)
}

const changeBackgroundColor = () => {
  if (!backgroundColor.value) {
    return
  }
  gksphoneFunctions.setStatusBarColor(backgroundColor.value)
}

const fetchNui = async (evName, data, mockData = null) => {
  if (!window.invokeNative) return mockData;
  const fetchLink = window.gksphone?.url ? "https://"+window.gksphone.url : "https://vue";
  const rawResp = await fetch(`${fetchLink}/${evName}`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF8",
    },
    method: "POST",
  });

  return await rawResp.json();
};

</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <h1>
        GKSPhone Vue 3 Example
      </h1>

      <p>
        This is an example of how to use GKSPhone functions in Vue 3.
      </p>

    </div>

    <img v-if="imageURL !== ''" :src="imageURL" height="150" alt="" @click="ImageViewer()"/>
    <div>
      Dark mode: {{ isDarkMode }}
    </div>
    <button @click="OpenCamera()">
      Open Camera
    </button>
    <button @click="OpenGallery()">
      Gallery poupup
    </button>
    <button @click="ExampleLoadingPoup()">
      Loading popup
    </button>
    <button @click="ExampleNotify()">
      Notify
    </button>
    <button @click="ExampleCalling(false)">
      Calling
    </button>
    <button @click="ExampleVideoCall()">
      Video call
    </button>
    <input type="text" placeholder="Number" v-model="number"  @blur="InputBlur()" @focus="InputFocus()"/>
    <button @click="ExampleEmoji()">
      Emoji
    </button>
    <input type="text" placeholder="Background Color" v-model="backgroundColor"  @blur="InputBlur()" @focus="InputFocus()"/>
    <button @click="changeBackgroundColor()">
      Change Background Color
    </button>
  </div>

</template>

<style scoped>
.app-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--text-primary);
}

.app-header {
    text-align: center;
    margin-bottom: 1rem;
}
</style>
