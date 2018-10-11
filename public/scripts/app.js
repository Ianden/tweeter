$( document ).ready( () => {

  function sanitizeHTML (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

	function createTweetElement(tweet) {
		let name = tweet.user['name'];  
		let avatar = tweet.user.avatars.small;
		let handle = tweet.user.handle;
		
    let content = tweet['content']['text'];
    let safe = sanitizeHTML(content);

		let created = tweet.created_at;

		let $tweet = this.$fixture = $([
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
          `<span class="footer-text">${created}</span>`,
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
    $('main .tweet-list').empty();
		for (let tweet of tweets) {
			$('main .tweet-list').prepend(createTweetElement(tweet));
		}
	}

  function loadTweets() {
    $.getJSON( "/tweets", function( data ) {
      console.log(data);
      renderTweets(data);
    });
    return 'success';
  }

  $("#new-tweet-form").submit(function(e) {

    e.preventDefault();

    let form = $(this);
    let url = form.attr('action');
    let tweet = $('#new-tweet-form textarea').val();

    if (tweet.replace(/\s/g, '').length && tweet.length <= 140) {
      $.ajax({
         type: "POST",
         url: url,
         data: form.serialize(),
         success: function(data) {
            $('.error-container').slideUp( "fast" );
            console.log('success');
            loadTweets();
         }
     });
  } else {
    $('.error-container').slideDown( "fast" );
    $('.error-container').text("String is either too long or too empty");
  }
});

  $( "#compose" ).click(function() {
    $( '.new-tweet' ).slideToggle( "fast" );
    $( '.new-tweet textarea' ).focus();
  });

loadTweets();

});
