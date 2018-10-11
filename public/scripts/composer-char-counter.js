function notify() {
	// `this` points to 'section.new-tweet form textarea', because that is the object notify was 
	// calle dfrom (see line 20)
	const characters = $( this ).val().length;
	const remaining = 140 - characters;
	// set the actual counter to the number of characters remaining
	$( 'section.new-tweet form span.counter' ).text(remaining);

		// change the text colour to red if there is less than 0 characters remaining (I added a rulw in my .css file that
		// changed the text colour of all .danger elements to red).
	 if (remaining < 0) {
	 	$( 'section.new-tweet form span.counter' ).addClass( 'danger' );
	 }
	 else {
	 	$( 'section.new-tweet form span.counter' ).removeClass( 'danger' );
	 }
}

$(document).ready( () => {
	$( 'section.new-tweet form textarea' ).on('keyup', notify);
});