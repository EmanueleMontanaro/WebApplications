import { Question,Answer } from "./QAModels.mjs";

const SERVER_URL ='http://localhost:3001'

const getQuestions = async() => {
  const response = await fetch(SERVER_URL + '/api/questions');
  if(response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(q => new Question(q.id, q.text, q.email, q.date));
  } else {
    throw new Error('Internal Server Error'); //Since it would be a 500
  }
}

const getAnswers = async(questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`);
  if(response.ok) {
    const answerJson = await response.json();
    return answerJson.map(ans => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
  } else {
    throw new Error('Internal Server Error'); //Since it would be a 500
  }
}

const API = {getAnswers, getQuestions};

export default API;