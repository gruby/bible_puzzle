let oldTestament;
let verseDiv = document.getElementById('verse');
let addressDiv = document.getElementById('address');
let missingWordDiv = document.getElementById('missingWord');

//Function that loads NKJV into localStorage
let loadBible = () => {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'json/ot.json');
  ourRequest.onload = () => {
    localStorage.setItem('ot', ourRequest.responseText);
    oldTestament = JSON.parse(ourRequest.responseText); 
  }
  ourRequest.send();
}

//if NKJV is in the localstorage - use it. If not - load it into localStorage 
if (localStorage.key('ot')) {
  oldTestament = JSON.parse(localStorage.getItem('ot'));
} else {
  loadBible();
}

let retrieveQuote = (coordinates) => {
  let leads = coordinates.split(',');
  return oldTestament.books[leads[0]].chapters[leads[1]].verses[leads[2]].text;
}

let returnBibleAddress = (coordinates) => {
  let leads = coordinates.split(',');
  return `${oldTestament.books[leads[0]].name}: ${oldTestament.books[leads[0]].chapters[leads[1]].num},${oldTestament.books[leads[0]].chapters[leads[1]].verses[leads[2]].num}`
}

let getRandomVerse = () => {
  let coordinates = ""
  let book = fairBook();
  let chapter = ( Math.floor(Math.random() *oldTestament.books[book].chapters.length ) );
  let verse = ( Math.floor(Math.random() *oldTestament.books[book].chapters[chapter].verses.length ) );
  coordinates = coordinates + book + "," + chapter + "," + verse;
  return coordinates;
}

let generatePuzzle = (sentence) => {
  let outcome = [];
  let words = [];
  let toBeAvoided = ['the', 'and', 'you', 'for', 'not', 'with', 'them', 'who'];
  sentence.replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(x => x.length > 2).forEach(element => {
    if (!toBeAvoided.includes(element.toLowerCase())) {
      words.push(element);
    }
  });
  let puzzleWord = words[ Math.floor(Math.random() *words.length)];
  let placeholder = "_".repeat(puzzleWord.length-1) + `(${puzzleWord.length})`;
  let puzzle = sentence.replaceAll(`${puzzleWord}`, `${placeholder}`);
  let bolded = sentence.replaceAll(`${puzzleWord}`, `<b><u>${puzzleWord}</u></b>`);
  outcome.push(puzzleWord);
  outcome.push(puzzle);
  outcome.push(bolded);
  return outcome;
}

verseDiv.onclick = () => {
  let nextverse = getRandomVerse();
  let puzzled = generatePuzzle(retrieveQuote(nextverse));
  let location = returnBibleAddress(nextverse);

  addressDiv.innerHTML = "<p>Where is it?</p>";
  addressDiv.style.background = 'rgb(210, 240, 240)';
  missingWordDiv.innerHTML = "<p>What word is missing?</p>";
  missingWordDiv.style.background = 'rgb(210, 240, 240)';

  verseDiv.innerHTML = `<p>${puzzled[1]}</p>`;  

  addressDiv.onclick = () => {
    addressDiv.innerHTML = `<p>${location}</p>`;
    addressDiv.style.background = 'rgb(232, 252, 255)';
  }

  missingWordDiv.onclick = () => {
    missingWordDiv.innerHTML = `<p>${puzzled[0]}</p>`;
    missingWordDiv.style.background = 'rgb(232, 252, 255)';
    verseDiv.innerHTML = `<p>${puzzled[2]}</p>`; 
  }
}

// Balance of the distribution of verses
let fairBook = () => {
  let book = Math.floor(Math.random() *260 );

  if (book < 28) {
    return 0;
  } else if (book < 44) {
    return 1;
  } else if (book < 68) {
    return 2;
  } else if (book < 89) {
    return 3;
  } else if (book < 117) {
    return 4;
  } else if (book < 133) {
    return 5;
  } else if (book < 149) {
    return 6;
  } else if (book < 162) {
    return 7;
  } else if (book < 168) {
    return 8;
  } else if (book < 174) {
    return 9;
  } else if (book < 178) {
    return 10;
  } else if (book < 182) {
    return 11;
  } else if (book < 187) {
    return 12;
  } else if (book < 190) {
    return 13;
  } else if (book < 196) {
    return 14;
  } else if (book < 200) {
    return 15;
  } else if (book < 203) {
    return 16;
  } else if (book < 204) {
    return 17;
  } else if (book < 217) {
    return 18;
  } else if (book < 222) {
    return 19;
  } else if (book < 227) {
    return 20;
  } else if (book < 230) {
    return 21;
  } else if (book < 235) {
    return 22;
  } else if (book < 236) {
    return 23;
  } else if (book < 237) {
    return 24;
  } else if (book < 238) {
    return 25;
  } else {
    return 26;
  }
}
