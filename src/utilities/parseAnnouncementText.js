export const parseAnnouncementText = (text, regex) => {
    const textToReplace = text.match(regex) || [];
    const textArr = [];
  
    let start = 0;
    textToReplace.forEach((e) => {
      let index = text.indexOf(e, start);
      let lastIndex = index + e.length;
  
      textArr.push(text.slice(start, index), e);
      start = lastIndex;
    });
  
    textArr.push(text.slice(start));
    return textArr;
  }