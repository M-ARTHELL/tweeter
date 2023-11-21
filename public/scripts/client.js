/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$( document ).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const createTweetElement = function(tweetObj) {
    const output = `
    <article class="tweet">
    <header>
      <div class="display-name">
        <img src=${tweetObj.user.avatars} alt="${tweetObj.user.name}'s profile image.">
        ${tweetObj.user.name}
      </div>
      <div class="username">
        ${tweetObj.user.handle}
      </div>
    </header>
      <div class="tweet-content">${tweetObj.content.text}</div>
    <footer>
      <div>${tweetObj.created_at}</div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `;
  return output;
  };

  const renderTweets = function(tweetArray) {
    for (const tweet of tweetArray) {
      let $tweet = createTweetElement(tweet)
      $('.tweet-container').append($tweet);
    }
  }
  
  renderTweets(data);
  
});




