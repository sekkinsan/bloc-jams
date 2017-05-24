//Dynamically generating song row content
var createSongRow = function(songNumber, songName, songLength){
  var template =
      '<tr class = "album-view-song-item">'
    + '   <td class="song-item-number" data-song-number = "' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    //return template refactoring checkpoint-17
    //return $(template); refactored to
    var $row = $(template);

    var clickHandler = function(){
      var songNumber = $(this).attr('data-song-number');

      if (currentlyPlayingSongNumber !== null) {
        // Revert to song number for currently plyaing song since user chose to play new song.
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
      }
      if (currentlyPlayingSongNumber !== songNumber){
        //Switch from play to pause button to indicate new song is playing
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber-1];
        updatePlayerBarSong();
      }
      else if (currentlyPlayingSongNumber === songNumber){
        //Switch from pause to play button to pause currently playing song.
        $(this).html(playButtonTemplate);
        //revers HTML of elemnt to playerBarPlayButton when song is paused
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
      }
    };
//refactoring mouseover to onHover checkpoint-18
    var onHover = function(event){
      var songNumberCell = $(this).find('.song-item-number')
      var songNumber = (songNumberCell.attr('data-song-number'));

      if (songNumber !== currentlyPlayingSongNumber){
        songNumberCell.html(playButtonTemplate);
      }
    };

//refactoring mouseleave to offHover checkpoint-18
    var offHover = function(event){
      var songNumberCell = $(this).find('.song-item-number')
      var songNumber = (songNumberCell.attr('data-song-number'));

      if (songNumber !== currentlyPlayingSongNumber){
        songNumberCell.html(songNumber);
      }
          console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    };
    //find() is similar to querySelector().
    $row.find('.song-item-number').click(clickHandler);
    //hover() combines mouseover and mouseleave functions relied on previously, first argument is callback when user mouses over, second is when mouse leaves row.
    $row.hover(onHover, offHover);
    //return $row, created with the event listeners attached.
    return $row;
};

/* #1  we select all HTML elements that are required to display on the album
We want to populate these elements with information, so we assign the
corresponding values of the album objects' properties to the HTML elements.
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0]; */

//refactoring DOM selectors checkpoint-17
var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
  currentAlbum = album;

  /* #2
  firstChild property identifies the firstchild node of an element, and nodeValue
  returns or sets the value of a node.
  Example .albumTitle element only has one node and it's text. When we use
  firstchild and nodevalue properties together on it, we set the value of that
  text node to album.title
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl); */
  // refactoring checkpoint-17
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  //we use text() method to replace content of the text nodes
  //we use attr() method which changes element attribute using the same arguments


  /* #3 we initially set the value of the parent container's innerHTML to an
  empty string to ensure that we were working with a clean slate!
  albumSongList.innerHTML = ''; */
  //refactoring checkpoint-17
  $albumSongList.empty();

  /* #4 we use for loop to go through all the songs from the specified album
  object and insert them into the HTML using innerHTML. createSongRow function
  is called at each loop, passing in the information from our album object */
  for (var i = 0; i < album.songs.length; i++) {
    //albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    //refactoring checkpoint-17
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
    }
};

//create helper method that returns the index of a song found in album's song array
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};
//next song
var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // incrementing
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

//previous song
var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //decrementing
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function(){
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

//code to update HTML of play/pause button to content of playerBarPauseButton
  $('.main-controls .play-pause').html(playerBarPauseButton);


};

var albums=[albumPicasso, albumMarconi, albumIU]; //create an array of the albums we want to loop for below event listener for easy access using array indices
var index = 1;
/*albumImage.addEventListener("click",function(event){ //click event on image which will trigger below function
    setCurrentAlbum(albums[index]); //way to access the array
    index++; //each time you click it will go to the next array index
    if (index == albums.length) { //this is for when the third album is reached, when clicked it will reclick to first one.
      index = 0;
    }
});*/

$albumImage.on("click",function(event){
  setCurrentAlbum(albums[index]); //way to access the array
  index++; //each time you click it will go to the next array index
  if (index == albums.length) { //this is for when the third album is reached, when clicked it will reclick to first one.
    index = 0;
}
});

/* removing deprecated code since jQuery renders these unnecessary checkpoint-18
//........Begin findParentByClassName function (Checkpoint 13)

var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className !== targetClass && currentParent.className !== null){
        currentParent = currentParent.parentElement;
    }
    return currentParent;
  }
  //check to see if parent exists (checkpoint 13)
  else if (currentParent === null) {
    console.log("No parent found.")
  }
  else if (currentParent.className.innerHTML !== "No parent found with that class name."){
    console.log("No parent found with className?")
  }
};

//...........End findParentByClassName function (checkpoint 13)

//............Begin getSongItem function (checkpoint 13)

var getSongItem = function(element){
  switch (element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

//..............End getSongItem function (checkpoint 13)

//..........Adding a clickHandler function (checkpoint 13)

var clickHandler = function(targetElement) {

     var songItem = getSongItem(targetElement);

     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
       var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   }

};
*/

/* createSongRow replace below functionality.
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
*/
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//renaming to currentlyPlayingSongNumber to be more explicit
//var currentlyPlayingSong = null;
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

//window.onload = function(){ we create a function that sets current album to picasso
$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});


/* don't need click event listener
  for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('click', function(event) {
          //Event Handler call checkpoint 13
          clickHandler(event.target);
        });
    } */
