import dayjs from 'dayjs';

function Answer(id, text, email, date, score=0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.score = score;
  this.date = dayjs(date);
}

function Question(id, text, email, date) {
  this.id =id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.answers = [];

  this.addAnswer = (answer) => {
    this.answers.push(answer);
  }

  this.getAnswers = () => {
    return [...this.answers];
  }

  this.init = () => {
    this.answers = [
      new Answer(1, 'Yes', 'luca.mannella@polito.it', '2024-02-28', -10),
      new Answer(2, 'Not in a million year', 'guido.vanrossum@python.org', '2024-03-01', 5),
      new Answer(3, 'No', 'albert.einstein@relativity.org', '2024-03-11'),
      new Answer(4, 'Then, I don\'t know', 'luca.mannella@polito.it', '2024-03-10')
    ];
  }
}

export { Question, Answer };