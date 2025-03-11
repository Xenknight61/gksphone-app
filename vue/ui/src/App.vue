<script setup>
import { ref, onMounted } from 'vue';
const isDarkMode = ref(false)
const number = ref('')
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

const InputBlur = async () => {
  if (!window.invokeNative) return;

  const data = {
    value: true,
  };

  await fetchNui("input", data);
}

const InputFocus = async () => {
  if (!window.invokeNative) return;

  const data = {
    value: false,
  };

  await fetchNui("input", data);
}

const fetchNui = async (evName, data, mockData = null) => {
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


    <div>
      Dark mode: {{ isDarkMode }}
    </div>
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
}

.app-header {
    text-align: center;
    margin-bottom: 1rem;
}
</style>
