import { fetchNui, isEnvBrowser, DEV_MODE } from "./utils.js";

document.getElementById("button").onclick = async () => {
    const test = await fetchNui("dataCheck", {id: 1});
    if (DEV_MODE || isEnvBrowser()) {
        console.log(test);
    }
};

window.addEventListener('message', (event) => {
    const e = event.data
    console.log(JSON.stringify(e));
})
