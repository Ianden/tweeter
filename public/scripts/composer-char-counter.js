function notify() {
	const characters = $( this ).val().length;
	const remaining = 140 - characters;
	$( 'section.new-tweet form span.counter' ).text(remaining);
	
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