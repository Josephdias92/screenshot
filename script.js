// Things we need to keep track of
var start = {};
var end = {};
var isSelecting = false;
var obj = {};
$(window)
  // Listen for main-container
  .on('mousedown', function($event) {
    // Update our state
    isSelecting = true;
    $('#main-container').removeClass('complete');
    start.x = $event.pageX;
    start.y = $event.pageY;

    // Add main-container to screen
    $('#main-container').css({
      left: start.x,
      top: start.y
    });
  })
  // Listen for movement
  .on('mousemove', function($event) {
    // Ignore if we're not selecing
    if (!isSelecting) {
      return;
    }

    // Update our state
    end.x = $event.pageX;
    end.y = $event.pageY;
    obj = {
      left: start.x < end.x ? start.x : end.x,
      top: start.y < end.y ? start.y : end.y,
      width: Math.abs(start.x - end.x),
      height: Math.abs(start.y - end.y)
    };
    // Move & resize main-container to reflect mouse position
    $('#main-container').css(obj);
  })
  // listen for end
  .on('mouseup', function($event) {
    console.log($event);
    // Update our state
    isSelecting = false;
    domvas.toImage(document.getElementById("main-container"), function(d) {
        $('#main-container').append(d);
      },
      obj.width, obj.height, obj.left,
      obj.top);
    $('#main-container').addClass('complete');
  });
