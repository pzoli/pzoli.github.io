// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

$('.filter').click(function(event) {
  var color = $(this).css("background-color")
  var origin = "rgb(55, 140, 63)"
  $(this).css('background-color',  color ==  origin ? 'white' : origin)
  $(this).css('color',  color ==  origin ? 'black' : "white")
  
  var selector = $(this).text().toLowerCase()
  var visible = $(this).css("background-color") ==  origin
  
  $(".filterable").each(function() {
    var filter = $(this).data('filter').split(" ")
    if (visible) {
      if ($(this).hasClass(selector)) {
        filter.push(selector)
        $(this).data('filter', filter.join(" "))
        $(this).css('opacity',"100%")  
      }
    } else {
      var idx = filter.indexOf(selector)
      if ( idx > -1) {
          filter.splice(idx, 1)
          var newFilter = filter.join(" ")
          $(this).data('filter', newFilter)
          $(this).css('opacity', newFilter.trim().length > 0 ? "100%":"30%")
        
      }
    }
  })
})