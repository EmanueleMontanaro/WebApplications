import { Meme } from "../../../server/MemeModels.mjs"

const SERVER_URL ='http://localhost:3001'

const getRandomMeme = async(login) => {
    if (login){
      return await getFullGame();
    } 
    else {
      return await getSingleGame();
    }
}

const getFullGame = async() => {
  const response = await fetch(`${SERVER_URL}/api/memes`,{
    credentials: 'include'
  });
  if(response.ok) {
    const memesJson = await response.json();
    return memesJson.map(meme => new Meme(meme.id, meme.src, meme.answers));
  } else {
    throw new Error('Internal Server Error');
  }
}

const getSingleGame = async() => {
    const response = await fetch(`${SERVER_URL}/api/meme`);
    if(response.ok) {
      const memeJson = await response.json();
      return new Meme(memeJson.id, memeJson.src, memeJson.answers);
    } else {
      throw new Error('Internal Server Error');
    }
  }

const getAnswers = async(id) => {
  const response = await fetch(`${SERVER_URL}/api/meme/${id}`);
  if (response.ok) {
    const answersJson = await response.json();
    return answersJson; 
  } else {
    throw new Error('Internal Server Error');
  }
}

const postMatch = async(match) => {
  const response = await fetch (`${SERVER_URL}/api/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      userId: match.userId,
      date: match.date, 
      hour: match.hour,
      src1: match.src1,
      text1: match.text1,
      value1: match.value1,
      src2: match.src2,
      text2: match.text2,
      value2: match.value2,
      src3: match.src3,
      text3: match.text3,
      value3: match.value3,
      score: match.score
    }),
  });
  if(!response.ok){
    const errMessage = await response.json();
    throw errMessage;
  }
}

const getHistory = async(userid) => {
  const response = await fetch(`${SERVER_URL}/api/history/${userid}`, {
    credentials: 'include'
  });
  if(response.ok) {
    const historyJson = await response.json();
    return historyJson;
  } else {
    throw new Error('Internal Server Error');
  }
}

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};


const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw Error("No previous session available"); 
  }
};


const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = {getRandomMeme, getSingleGame, getAnswers, logIn, getUserInfo, logOut, postMatch, getHistory};

export default API;