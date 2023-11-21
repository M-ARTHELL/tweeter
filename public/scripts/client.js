/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$( document ).ready(function() {

  //loading tweets
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
      <div>${timeago.format(tweetObj.created_at)}</div>
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
      $('.tweet-container').prepend($tweet);
    }
  }
  

  //submitting tweets
  $('.new-tweet form').on("submit", function(event) {
    const formData = $(this).serialize();
    event.preventDefault();

    if ($('.counter').val() < 0) {
      alert("Err: Too many characters!")
      
    } else if (formData === "text=") {
      alert("Err: No text provided!")

    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: formData,
        error: (errorThrown) => console.log(errorThrown),
        success: () => console.log('success')
      })
      .then(function() {
        loadTweets()
        $('#tweet-text').val('');
      });
    };
  });


  //load tweets
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      error: (err) => console.log(err),
      success: (tweetDB) => renderTweets(tweetDB)
    })
  };

loadTweets();

});




