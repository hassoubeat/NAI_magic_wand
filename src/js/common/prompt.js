// public 

export function generateWorkPromptsArrayFromString(prompts) {
  if (!prompts) return [];
  const workPromptsArray = prompts.split(",");
  return workPromptsArray.map( workPrompt => {
    
    const countCurlyBracket = getCountCurlyBracket(workPrompt);
    workPrompt = removeCurlyBracket(workPrompt);
    workPrompt = workPrompt.trim();
    
    return {
      originalPrompt: generatePromptsWithCurlyBracket(workPrompt, countCurlyBracket),
      prompt: workPrompt,
      isUse: true,
      countCurlyBracket
    }
  });
}

export function generateWorkPromptsStringFromArray(workPromptsArray) {
  let prompts = "";
  workPromptsArray.forEach((workPrompt, index) => {
    if (!workPrompt.isUse) return;
    let prompt = generatePromptsWithCurlyBracket(workPrompt.prompt, workPrompt.countCurlyBracket);

    prompts = `${prompts} ${prompt}`;
    // Add , expecting last item.
    if (workPromptsArray.length !== index + 1) prompts = `${prompts},`;
  });
  return prompts;
}

export function generatePromptsWithCurlyBracket(prompt, countByCurlyBracket) {
  [...Array(countByCurlyBracket)].forEach(() => {
    prompt = `{${prompt}}`;
  });
  return prompt;
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