$( document ).ready( () => {

  // make sure the user can't enter in some naughty code and make bad things happen
  function sanitizeHTML (str) {
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  // initialize a new tweet
  function createTweetElement(tweet) {
  	const name = tweet.user['name'];
    const handle = tweet.user.handle;  
  	const avatar = tweet.user.avatars.small;
  		
    const content = tweet['content']['text'];
    const safe = sanitizeHTML(content);
  
    // my attempt at making the timestamps nicer
  	const created = tweet.created_at;
      
    const currentSeconds = Date.now() / 1000;
    const createdSeconds = Math.floor(created / 1000);
    
    const seconds = currentSeconds - createdSeconds;

    let timestamp;

    if (seconds > 2 * 24 * 3600) {
      timestamp = `${Math.floor(seconds / (24 * 3600))} days ago.`;
    } else if (seconds > 24 * 3600) {
      timestamp = `Yesterday,`;;
    } else if (seconds > 2 * 3600) {
      timestamp = `${Math.floor(seconds / 3600)} hours ago.`;
    } else if (seconds > 3600) {
      timestamp = `An hour ago.`;
    } else if (seconds > 2 * 60) {
      timestamp = `${Math.floor(seconds / 60)} minutes ago.`;
    } else {
      timestamp = `Just now.`;
    }

  	const $tweet = $([
  		`<article class="tweet">`,
      	`<header>`,
       		`<img src=${avatar}>`,
         	`<span class="author">${name}</span>`,
         	`<span class="author-handle">${handle}</span>`,
       	`</header>`,
     		`<div class="tweet-body">`,
        	`<span class="tweet-text">${safe}</span>`,
        `</div>`,
        `<footer>`,
          `<span class="footer-text">${timestamp}</span>`,
          `<div class="footer-icons-container">`,
            `<img src="images/flag.svg">`,
            `<img src="images/repeat.svg">`,
            `<img src="images/heart.svg">`,
          `</div>`,
        `</footer>`,
      `</article>`
  	].join("\n"));

  	return $tweet;
  }

  function renderTweets(tweets) {
    // empty container
    $('main .tweet-list').empty();
  	for (let tweet of tweets) {
  		$('main .tweet-list').prepend(createTweetElement(tweet));
  	}
  }

  // get all tweets
  function loadTweets() {
    $.getJSON( "/tweets", data => {
      renderTweets(data);
    });
    return;
  }

  $("#new-tweet-form").submit(function(e) {

    e.preventDefault();

    let form = $(this);
    let url = form.attr('action');
    console.log(url);
    let tweet = $('#new-tweet-form textarea').val();

    // client-side error handling for invalid tweets
    if (!(tweet.replace(/\s/g, '').length)) {
      $('.error-container').slideDown( "fast" );
      $('.error-container').text("Tweet cannot be empty.");
    } else if (!(tweet.length <= 140)) {
      $('.error-container').slideDown( "fast" );
      $('.error-container').text("Limitations inspire creativity.");
    } else {
      $.ajax({
       type: "POST",
       url: url,
       data: form.serialize(),
       success: function(data) {
          $('.error-container').slideUp( "fast" );
          loadTweets();
        }
     });
    }
  });

  $( "#compose" ).click(function() {
    $( '.new-tweet' ).slideToggle( "fast" );
    $( '.new-tweet textarea' ).focus();
  });

  loadTweets();

});
