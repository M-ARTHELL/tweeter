$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let inputValue = $(this).val();
    let characterCount = inputValue.length;
    const maxLength = 140;
    let remainingChars = maxLength - characterCount;
    const counter = $(this).parent().find(".counter");
    
    counter.text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  })
});