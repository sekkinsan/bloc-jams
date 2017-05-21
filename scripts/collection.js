// var collectionItemTemplate = refactor to jQuery checkpoint-17

var buildCollectionItemTemplate = function() {
  var template =
  '<div class="collection-album-container column fourth">'
+ ' <img src="assets/images/album_covers/01.png"/>'
+ ' <div class="collection-album-info caption">'
+ '   <p>'
+ '     <a class="album-name" href="album.html"> The Colors </a>'
+ '     <br/>'
+ '     X songs'
+ '     <br/>'
+ '   </p>'
+ ' </div>'
+ '</div>'
;
return $(template);
};
//wrapped template in a jQuery object $(template); which is wrapped in function
//function returns markup string as a jQ object

/*
window.onload = function() {
  1) we select the first (and only) element with album-covers class name
  and assigned it to variable named collectionContainer
  var collectionContainer = document.getElementsByClassName('album-covers')[0];
   2) we assign empty string to collectionContainer's innerHTML property to
  clear its content (ensure we working with a clean slate)
  collectionContainer.innerHTML = '';
  3) create for loop that inserts 12 albums using +=, each loop adds The
  contents of collectionItemTemplate (template) to the innerHTML of
  collectionContainer, generating the albums that dispaly on collection page
  for (var i = 0; i < 12; i++) {
      collectionContainer.innerHTML += collectionItemTemplate;
  }
} */

//begin refactoring checkpoint-17
$(window).load(function() {
  //substituted DOM selection with shorter jQ alternative,
  //element changed to jQ object we prefix collectionContainer with $ (to define it as a jQ variable)
  var $collectionContainer = $('.album-covers');
  //replaced vanilla innerHTML property with jQ empty() method that empties, or removes any text or other elements
  $collectionContainer.empty();

  for (var i=0; i < 12; i++) {
    var $newThumbnail = buildCollectionItemTemplate();
    //we replace the += in our for loop with append() method
    $collectionContainer.append($newThumbnail);
  }
});
