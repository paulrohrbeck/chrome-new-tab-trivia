(function(){
  'use strict';

  /*
  See https://opentdb.com/api_config.php
  */

  const endpoint = 'https://opentdb.com/api.php?amount=1&type=multiple';
  const loading = document.getElementsByClassName('loading')[0];
  const category = document.getElementsByClassName('category')[0];
  const question = document.getElementsByClassName('question')[0];
  const answers = document.getElementsByClassName('answers')[0];
  const backgrounds = ['turquoise', 'emerald', 'peter-river', 'amethyst', 'wet-asphalt', 'green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue', 'sunflower', 'carrot', 'alizarin', 'concrete', 'orange', 'pumpkin', 'pomegranate', 'silver', 'asbestos'];

  // handle api promise
  function handleResponse(response) {
    loading.classList.add('hidden');
    if (response.ok) {
      response.json().then(readJson);
    } else {
      alert('An error occurred.');
    }
  }

  // read json and initialize ui with data
  function readJson(json) {
    const api = json.results[0];
    category.innerHTML = api.category;
    question.innerHTML = api.question;

    showIncorrectAnswers(api.incorrect_answers);
    showCorrectAnswer(api.incorrect_answers, api.correct_answer)
    highlightCorrectAnswer(api.question.length * 50);
  }

  // answer options:
  function showIncorrectAnswers(incorrectAnswers) {
    incorrectAnswers.forEach(function(element) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(decodeCharacters(element)));
      answers.appendChild(li);
    });
  }

  // add correct answer in random location
  function showCorrectAnswer(incorrectAnswers, correctAnswer) {
    const childIndex = getRandomIntInclusive(0, incorrectAnswers.length);
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(decodeCharacters(correctAnswer)));
    li.classList.add('correct');
    if (childIndex > incorrectAnswers.length) {
      answers.appendChild(li);
    } else {
      answers.insertBefore(li, answers.children[childIndex]);
    }
  }

  // correct answer is shown after a certain time that depends on how long the question is
  function highlightCorrectAnswer(timeout) {
    setTimeout(function(){
      document.getElementsByClassName('correct')[0].classList.add('active');
    }, timeout);
  }

  // Returns a random integer between min (included) and max (included)
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Decode HTML encoded characters
  function decodeCharacters(text) {
    var el = document.createElement('textarea');
    el.innerHTML = text;
    return el.value;
  }

  // add color class to body
  document.body.classList.add(backgrounds[getRandomIntInclusive(0, backgrounds.length - 1)]);

  // Kick off API call
  fetch(endpoint).then(handleResponse);

})();
