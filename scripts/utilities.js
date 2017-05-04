/* Write a function named forEach without using the built-in Array.prototype.forEach
function mentioned in the callback resource. It should:
use a loop to go through all elements in the points Array
execute a callback for each element.

Replace the for loop in the animatePoints function with a forEach block and
confirm that the selling points still animate properly. */

function forEach(array, callback){
  for(var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}
