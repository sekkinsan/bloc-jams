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

var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
point.style.opacity = 1;
point.style.transform = "scaleX(1) translateY(0)";
point.style.msTransform = "scaleX(1) translateY(0)";
point.style.WebkitTransform = "scaleX(1) translateY(0)";
}; /* revealPoint becomes the callback function in forEach */

/*
for (var i = 0; i < points.length; i++) {
  revealPoint(i);
} old for function replaced by forEach function */

var animatePoints=function(points){

  forEach(points, revealPoint);
};

window.onload = function() {
  // Automatically animate the points on a tall screen where scrolling can't trigger the animation
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }

  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  });
}
/* window.onload property is assigned an event handler, a function that handles
code in response to an event. The event handler executes as soon as an action
fires an event.
We can listen to all events, including scroll, on any DOM element. However, we
wanted to listen specifically for when the user scrolled the ENTIRE page, so we
attached it to the window object. */
