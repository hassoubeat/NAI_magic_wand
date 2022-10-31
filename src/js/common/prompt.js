// public 

export function generateWorkPromptsArrayFromString(prompts) {
  if (!prompts) return [];
  const workPromptsArray = prompts.split(",");
  return workPromptsArray.map( workPrompt => {
    
    const countCurlyBracket = getCountCurlyBracket(workPrompt);
    const countSquareBracket = getCountSquareBracket(workPrompt);

    const weight = countCurlyBracket - countSquareBracket;
    workPrompt = removeCurlyBracket(workPrompt);
    workPrompt = removeSquareBracket(workPrompt);
    workPrompt = workPrompt.trim();
    
    return {
      originalPrompt: generatePromptsWithWeight(workPrompt, weight),
      prompt: workPrompt,
      isUse: true,
      weight
    }
  });
}

export function generateWorkPromptsStringFromArray(workPromptsArray) {
  let prompts = "";
  workPromptsArray.forEach((workPrompt, index) => {
    if (!workPrompt.isUse) return;
    let prompt = generatePromptsWithWeight(workPrompt.prompt, workPrompt.weight);

    prompts = `${prompts} ${prompt}`;
    // Add , expecting last item.
    if (workPromptsArray.length !== index + 1) prompts = `${prompts},`;
  });
  return prompts;
}

export function generatePromptsWithWeight(prompt, weight) {
  const absoluteCount = Math.abs(weight);

  [...Array(absoluteCount)].forEach(() => {
    if (weight > 0) {
      prompt = `{${prompt}}`;
    } else {
      prompt = `[${prompt}]`;
    }
  });
  return prompt;
}

export function checkCurrentVersionWorkPromptsArray(workPromptsArray) {
  try {
    workPromptsArray.forEach((workPrompt) => {
      if(!checkCurrentVersionWorkPrompts(workPrompt)) throw "This WorkPrompts created by old version.";
    });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

// private

// count "{ }" set
function getCountCurlyBracket(str) {
  const startBracket = (str.match(/{/g) || []).length;
  const endBracket = (str.match(/}/g) || []).length;

  return Math.min(startBracket, endBracket);
}

// remove "{ }" set
function removeCurlyBracket(str) {
  str = str.replace(/{/g, "");
  str = str.replace(/}/g, "");
  return str;
}

// count "[ ]" set
function getCountSquareBracket(str) {
  const startBracket = (str.match(/\[/g) || []).length;
  const endBracket = (str.match(/\]/g) || []).length;

  return Math.min(startBracket, endBracket);
}

// count "[ ]" set
function removeSquareBracket(str) {
  str = str.replace(/\[/g, "");
  str = str.replace(/\]/g, "");
  return str;
}

// Check old version of workPrompts
function checkCurrentVersionWorkPrompts(workPrompts) {
  if (!("originalPrompt" in workPrompts)) return false;
  if (!("prompt" in workPrompts)) return false;
  if (!("isUse" in workPrompts)) return false;
  if (!("weight" in workPrompts)) return false;

  return true;
}