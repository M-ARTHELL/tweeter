//runs contents once the page is loaded
$( document ).ready(function() {


///////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////


  //createTweetElement
  //prepares tweets for display
  const createTweetElement = function(tweetObj) {

    //prevents user made scripts from running
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //adds tweet information to template
    const output = `
    <article class="tweet">
    <header>
      <div class="display-name">
        <img src=${tweetObj.user.avatars} alt="${escape(tweetObj.user.name)}'s profile image.">
        ${escape(tweetObj.user.name)}
      </div>
      <div class="username">
        ${escape(tweetObj.user.handle)}
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


  //renderTweets
  //runs array of tweets through createTweetElement and applies them to the dom
  const renderTweets = function(tweetArray) {
    for (const tweet of tweetArray) {
      let $tweet = createTweetElement(tweet)
      $('.tweet-container').prepend($tweet);
    }
  }


  //loadTweets
  //gets tweet array, if no error occurs, passes array to renderTweets function
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      error: (err) => console.log(err),
      success: (tweetDB) => renderTweets(tweetDB)
    })
  };


///////////////////////////////////////////////////////////////
// SUBMITTING TWEETS
///////////////////////////////////////////////////////////////
  

  //serializes new tweet data, checks for errors, and prevents redirect when posting
  $('.new-tweet form').on("submit", function(event) {
    const formData = $(this).serialize();
    event.preventDefault();


    //showErr
    //displays errors to the user
    const showErr = function(error) {
      const errIcon = '<i class="fa-solid fa-triangle-exclamation"></i>'

      //if no error is passed to the function, ignore
      if ($('.error').is(':hidden') && error === undefined) {
        return;
      
      //if an error is already visible, hides and replaces it before showing the next one
      } else if ($('.error').is(':visible') && error) {
          $('.error').slideToggle('slow', () => {
          $('.error').empty();
          $('.error').append(errIcon, error);
        })

      //if errors are hidden, replaces any possible previous errors before displaying the next one
      } else if ($('.error').is(':hidden')) {
        $('.error').empty();
        $('.error').append(errIcon, error);
      }
      
      //toggles error visibility
      $('.error').slideToggle()
    };


    //error cases
    //error for too many characters
    if ($('.counter').val() < 0) {
      if (!$('.error').is(':animated')) {
        showErr('ERROR: Tweet exceeds character limit.');
      }

    //error for blank form
    } else if (!$.trim($("textarea").val())) {
      showErr('ERROR: No text provided.')

    //if no error, hides any error messages, sends the tweet to the server, then reloads the tweet list.
    } else {
      showErr();

      $.ajax('/tweets', {
        method: 'POST',
        data: formData,
        error: (errorThrown) => console.log(errorThrown),
        success: () => console.log('success')
      })
      .then(function() {
        $('.tweet-container').empty();
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').val(140);
      });
    };
  });


///////////////////////////////////////////////////////////////
// TO RUN ON LOAD
///////////////////////////////////////////////////////////////

//displays tweets to the user on page load
  loadTweets();


  //expands textarea as user types
  $('#tweet-text').on('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  })
});




