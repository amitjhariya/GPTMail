// console.log("LinkedIn GPT");
let observer = new MutationObserver(handleContentEditableMutation);
observer.observe(document, { childList: true, subtree: true });

async function msgOpened() {
  console.log("msgOpened");

  const activeMsgCard = await waitforElement(
    ".msg-overlay-conversation-bubble--is-active"
  );
  // console.log({ activeMsgCard });
  let id = activeMsgCard.id;
  console.log({ id });

  if (activeMsgCard) {
    const gptBtns = document.querySelectorAll("#gpt-logo");

    gptBtns.forEach((item) => {
      const div = item.parentNode.parentNode; // get the parent div element
      div.parentNode.removeChild(div);
    });
    const msgFooter = activeMsgCard.querySelector(".msg-form__left-actions");
    addGptButton(activeMsgCard, msgFooter, id);
  }
}

// console.log("Working...");

function addGptButton(activeMsgCard, element, id) {
  const gptButton = document.createElement("div");
  gptButton.innerHTML = `
    <button id="gpt_${id}"   style="cursor:pointer; background-color: #1b61d1;border: none;display: flex;justify-content: center;color: white;align-items: center;padding: 5px 20px 7px 10px;margin: 0 10px;border-radius: 25px;"> GPT<svg xmlns="http://www.w3.org/2000/svg"  class="gpt-svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
    <image id="gpt-logo"   x="0" y="0" width="16" height="16" xlink:href="data:img/png;base64,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">
  </image></svg></button>  
  `;

  // Add the new element as a sibling after the target element
  element.appendChild(gptButton);
  const btn = document.getElementById(`gpt_${id}`);
  btn.addEventListener("click", () => {
    useGpt(id);
  });
}

async function useGpt(id) {
  // console.log("Load messages now");
  // await wait(1000)
  //msg-s-message-list__event
  const activeMsgCard = document.getElementById(id);

  console.log(activeMsgCard);

  const messagesList = activeMsgCard.querySelectorAll(
    ".msg-s-message-list__event"
  );
  //Last 30 conversations
  const last30 = Array.from(messagesList).slice(-30);

  let conversation = ``;

  last30.forEach((element) => {
    // console.log(element.textContent); // print the text content of each element
    let name = element.querySelector(".msg-s-message-group__profile-link");
    let msgText = element.querySelector(".msg-s-event-listitem__body");
    // console.log(name?.innerText)
    if (name) {
      conversation = `${conversation}
      ${name.innerText} : 
      `;
    }

    if (msgText) {
      conversation = `${conversation} ${msgText.innerText}`;
    }
  });

  console.log({ conversation });

  let gptLogo = activeMsgCard.querySelector("#gpt-logo");
  if (gptLogo) {
    gptLogo.classList.add("gpt-rotate");
  }

  const textBox = activeMsgCard.querySelector(".msg-form__contenteditable");
  const placeHolder = activeMsgCard.querySelector(
    '[data-placeholder="Write a message…"]'
  );
  placeHolder.classList.remove("msg-form__placeholder");
  placeHolder.innerText = "";
  textBox.innerHTML = "<p>please wait...</p>";
  try {
    const { username } = await chrome.storage.sync.get("username");

    const prompt = `${conversation}
      Write a message pr reply  to the most recent coversation in comprehensive and professional tone and sign off with my name ${username} at the end`;
    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      n: 1,
    };
    const gptResponse = await sendOpenAIRequest(payload);
    textBox.innerHTML = `<p>${gptResponse}</p>`;
  } catch (error) {
    console.log(error);
    textBox.innerHTML = "<p>Please check  your Open Ai API keys</p>";
    setTimeout(() => {
      textBox.innerHTML = "<p></p>";
      chrome.runtime.sendMessage({ type: "openOptionsPage" });
    }, 2000);

    // console.error("Error sending message to background script:", error);
  } finally {
    gptLogo.classList.remove("gpt-rotate");
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleContentEditableMutation(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let node of mutation.addedNodes) {
        if (node.classList && node.classList.contains("msg-convo-wrapper")) {
          msgOpened();

          //   observer.disconnect(); // stop observing changes
        }
      }
    }
  }
}

function waitforElement(element) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkExist = setInterval(() => {
      const isExist = document.querySelector(element);
      if (isExist) {
        clearInterval(checkExist);
        resolve(isExist);
      } else if (Date.now() - startTime >= 180000) {
        clearInterval(checkExist);
        reject(new Error(`Timeout exceeded (${element})`));
      }
    }, 500);
  });
}

async function sendOpenAIRequest(payload) {
  try {
    const { apiKey } = await chrome.storage.sync.get("apiKey");
    const response = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (apiKey || ""),
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data.choices[0]?.text);
      return data.choices[0]?.text;
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    throw new Error("There was a problem with the fetch operation:", error);
  }
}

const styleElement = document.createElement("style");
styleElement.innerHTML = `@-webkit-keyframes gpt-rotate /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes gpt-rotate {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.gpt-rotate {
  -webkit-animation: gpt-rotate 2s linear infinite;
  -moz-animation: gpt-rotate 2s linear infinite;
  -ms-animation: gpt-rotate 2s linear infinite;
  -o-animation: gpt-rotate 2s linear infinite;
  animation: gpt-rotate 2s linear infinite;
  transform-origin:center
}
.gpt-svg{
  margin-left:8px;
  margin-right: -12px;
}

`;
document.head.appendChild(styleElement);
function generateRandomId() {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random().toString(36).substr(2, 5);
  return timestamp + randomChars;
}
