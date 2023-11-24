/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$( document ).ready(function() {

  //loading tweets
  const createTweetElement = function(tweetObj) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

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
      <div class="tweet-content">${escape(tweetObj.content.text)}</div>
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
  

  if ($('.error').is(':hidden')) {
    console.log('hidden')
  } else if ($('.error').is(':visible')) {
    console.log('visible')
  }

  //submitting tweets
  $('.new-tweet form').on("submit", function(event) {
    const formData = $(this).serialize();
    event.preventDefault();

    //displays errors to user
    const showErr = function(error) {
      const errIcon = '<i class="fa-solid fa-triangle-exclamation"></i>'

      if ($('.error').is(':visible')) {
        $('.error').slideToggle('slow', () => {
          $('.error').empty();
          $('.error').append(errIcon, error);
        })
      } else {
        $('.error').append(errIcon, error);
      }
      $('.error').slideToggle('slow')
    };


    if ($('.counter').val() < 0) {
      if (!$('.error').is(':animated')) {
        showErr('ERROR: Tweet is beyond character limit.');
      }

    } else if (formData === "text=") {
      showErr('ERROR: No text Provided!')

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
        $('.counter').val(140);
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




