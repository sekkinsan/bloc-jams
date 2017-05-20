/*var animatePoints = function() {

  below function, when called will activate the CSS transitions on the landing page.
  It will update the styles from what we've set in place in the CSS files to the new styles
  in the script. opacity will change from 0 to 1, transform property will scale the element
  from 90% to 100% of its width, and translate it 3rem up to its normal position

var points = document.getElementsByClassName('point');

  when our script runs, it assigns array like list of elements that have the class
  name point to the points var. Our program alters the style of each .point in
  the NodeList. The style property is an object that represents every style applied
  to the element */
/* old code
    var revealFirstPoint = function() {
      points[0].style.opacity = 1;
      points[0].style.transform = "scaleX(1) translateY(0)";
      points[0].style.msTransform= "scaleX(1) translateY(0)";
      points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var revealSecondPoint = function(){
      points[1].style.opacity = 1;
      points[1].style.transform = "scaleX(1) translateY(0)";
      points[1].style.msTransform = "scaleX(1) translateY(0)";
      points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var revealThirdPoint = function() {
      points[2].style.opacity = 1;
      points[2].style.transform = "scaleX(1) translateY(0)";
      points[2].style.msTransform = "scaleX(1) translateY(0)";
      points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();
};
refactor the individual style calls of the landing.js script to be a single
function named revealPoint that:
takes a single argument: the index of teh points class node element, and
gets called in a for loop */


//begin refactoring animatePoints jQuery checkpoint-16
// we remove this DOM selector that gets .point since jQuery selection is terse enough

/* var pointsArray = document.getElementsByClassName('point'); */
var animatePoints = function() {

/*
var revealPoint = function(point) {
point.style.opacity = 1;
point.style.transform = "scaleX(1) translateY(0)";
point.style.msTransform = "scaleX(1) translateY(0)";
point.style.WebkitTransform = "scaleX(1) translateY(0)";
}; */

//we use jQuery .css method to replace multiple style property instances
  var revealPoint = function() {
        $(this).css({
          opacity: 1,
          transform: 'scaleX(1) translateY(0)'
        });
      };

/*
for (var i = 0; i < points.length; i++) {
  revealPoint(i);
} old for function replaced by forEach function */

/*
var animatePoints=function(points){

  forEach(points, revealPoint);
}; */

// we replace for loop with jQuery $.each() function which iterates over each .point element and executes callback function, revealPoint
  $.each($('.point'), revealPoint);
};
//ADDITIONALLY: the revealPoint f(x) now refers to $(this) instead of a specific .point element, thus this was wrapped in a jQuery object $(this).

//made window a jQuery object checkpoint 16
$(window).load(function(){
if ($(window).height() > 950) {
  animatePoints();
}
//updated .innerHeight property to jQuery's height() method which gets or sets an object's height

var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
//replace getBoundingClientRect() with jQuery's .offset() method

$(window).scroll(function(event){
//addEventListener becomes jQuery's scroll() method, which takes function as an argument
//scroll() method is still an event handler, but jQuery wrapper obscures appearance of events


  if ($(window).scrollTop() >= scrollDistance) {
    animatePoints();
//we replace document.documentElement.scrollTop || document.body.scrollTop with jQuery equivalent
        }
    });
});
