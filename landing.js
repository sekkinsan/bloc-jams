var animatePoints = function() {
  /* below function, when called will activate the CSS transitions on the landing page.
  It will update the styles from what we've set in place in the CSS files to the new styles
  in the script. opacity will change from 0 to 1, transform property will scale the element
  from 90% to 100% of its width, and translate it 3rem up to its normal position */
    var points = document.getElementsByClassName('point');
/* when our script runs, it assigns array like list of elements that have the class
name point to the points var. Our program alters the style of each .point in
the NodeList. The style property is an object that represents every style applied
to the element */

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
