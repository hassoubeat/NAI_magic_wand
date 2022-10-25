const KEYS = {
  CURRENT_MENU: "CURRENT_MENU",
  PROMPTS: "PROMPTS",
  WORK_PROMPTS_ARRAY: "WORK_PROMPTS_ARRAY",
  PROMPTS_BOOKMARK_ARRAY: "PROMPTS_BOOKMARK_ARRAY",
  PROMPTS_BOOKMARK_FILTER_WORD: "PROMPTS_BOOKMARK_FILTER_WORD"
}

// public
export async function setCurrentMenu(value) {
  return await setLocalStorage(KEYS.CURRENT_MENU, String(value));
}

export async function getCurrentMenu() {
  return await getLocalStorage(KEYS.CURRENT_MENU);
}

export async function setOriginalPrompts(value) {
  return await setLocalStorage(KEYS.PROMPTS, String(value));
}

export async function getOriginalPrompts() {
  return await getLocalStorage(KEYS.PROMPTS);
}

export async function setWorkPromptsArray(value) {
  return await setLocalStorage(KEYS.WORK_PROMPTS_ARRAY, JSON.stringify(value));
}

export async function getWorkPromptsArray() {
  const workPromptsArray = await getLocalStorage(KEYS.WORK_PROMPTS_ARRAY);
  return workPromptsArray ? JSON.parse(workPromptsArray) : undefined;
}

export async function removeWorkPromptsArray() {
  await removeLocalStorage(KEYS.WORK_PROMPTS_ARRAY)
}

export async function setPromptsBookmarkArray(value) {
  return await setLocalStorage(KEYS.PROMPTS_BOOKMARK_ARRAY, JSON.stringify(value));
}

export async function getPromptsBookmarkArray() {
  const promptsBookmarkArray = await getLocalStorage(KEYS.PROMPTS_BOOKMARK_ARRAY);
  return promptsBookmarkArray ? JSON.parse(promptsBookmarkArray) : [];
}

export async function setPromptsBookmarkFilterWord(value) {
  return await setLocalStorage(KEYS.PROMPTS_BOOKMARK_FILTER_WORD, String(value));
}

export async function getPromptsBookmarkFilterWord() {
  return await getLocalStorage(KEYS.PROMPTS_BOOKMARK_FILTER_WORD);
}

// private

function setLocalStorage(key, value) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

function getLocalStorage(key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, (value) => {
      resolve(value[key] || undefined);
    });
  });
}

function removeLocalStorage(key) {
  return new Promise(resolve => {
    chrome.storage.local.remove(key, resolve);
  });
}