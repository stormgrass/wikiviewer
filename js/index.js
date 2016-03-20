/* jshint loopfunc:true*/

var searchterm = '';

//moving the searchbox up after entering the searchterm
function moveUp() {
    $('.searchbox').removeClass('inthemiddle');
    $('.searchbox').addClass('movedup');
}



function theSearch() {
  var searchReady = searchterm.split(' ').join('+');
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=parse',
        data: {
            action: 'query',
            list: 'search',
            srsearch: searchReady,
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(x) {

        	if (x.query.searchinfo.totalhits == '0') {

        		$('.results').append("<h4>Sorry, Wikipedia knows nothing about " + searchterm + "!</h4>");
        	}

        	else

            function toHtml() {
                var html = '';



                    $.ajax({
                        url: 'https://en.wikipedia.org/w/api.php?',
                        data: {
                            action: 'query',
                            titles: x.query.search[i].title,
                            prop: 'extracts',
                            exsentences: '3',
                            exintro: '1',
                            format: 'json'
                        },
                        dataType: 'jsonp',
                        success: function(z) {
                            html += ("<a href='https://en.wikipedia.org/wiki/" + encodeURIComponent(z.query.pages[Object.keys(z.query.pages)[0]].title)) + "'>";
                            html += ("<div id='singleresultsheader'><h4>" + z.query.pages[Object.keys(z.query.pages)[0]].title + " <i class=' small fa fa-external-link'></i></h4></div>");
                            html += ("</a>");
                            html += ("<div class='snippet'><p>" + z.query.pages[Object.keys(z.query.pages)[0]].extract + "</div><hr>");

                            $('.results').append(html);
                        }
                    });
            }

            	for (var i = 0, resultlength = x.query.search.length; i < resultlength; i++) {
              
            	toHtml();
           		 }






        },

        error: function(t) {

        	$('#singleresultsheader').html("Sorry, Wikipedia isn't responding");
        }
    });
}


function emptySearch() {
	if (searchterm	=== '') {
		$('.results').append("<h4>Sorry, but you do need to enter something!</h4>");
	}
}


$('#searchterm').keydown(function(event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
        searchterm = $('#searchterm').val();
        moveUp();
        $('#searchterm').blur();
        $("#theresults").show();
        $('#theresults').html('');
        emptySearch();
        console.time('Time it takes to create the results:');
        theSearch();
        console.timeEnd('Time it takes to create the results:');




        return false;


    }
});
$(document).ready(function() {
    $("#theresults").hide();

});

$('#hiddensecret').click(function() {
    function goToRandom() {
        window.open('http://en.wikipedia.org/wiki/Special:Random', '_blank');
    }
    goToRandom();
    // apiRandom();
    // moveUp();
    // $("#theresults").show();
});
