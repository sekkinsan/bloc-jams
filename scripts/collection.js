var collectionItemTemplate =
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

window.onload = function() {
  /* 1) we select the first (and only) element with album-covers class name
  and assigned it to variable named collectionContainer */
  var collectionContainer = document.getElementsByClassName('album-covers')[0];
  /* 2) we assign empty string to collectionContainer's innerHTML property to
  clear its content (ensure we working with a clean slate) */
  collectionContainer.innerHTML = '';
  /* 3) create for loop that inserts 12 albums using +=, each loop adds The
  contents of collectionItemTemplate (template) to the innerHTML of
  collectionContainer, generating the albums that dispaly on collection page */
  for (var i = 0; i < 12; i++) {
      collectionContainer.innerHTML += collectionItemTemplate;
  }
}
