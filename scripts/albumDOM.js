//Example 1
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21' },
    { title: 'Magenta', duration: '2:15' },
  ]
};

//Example 2
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Gulielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21' },
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

//Album 3 (my choice)
var albumIU = {
  title: 'Palette',
  artist: 'IU',
  label: 'Loen Entertainment',
  year: '2017',
  albumArtUrl: 'assets/images/album_covers/11.png',
  songs: [
    { title: 'Right Now', duration: '4:25'},
    { title: 'Palette', duration: '3:32'},
    { title: 'This Ending', duration: '4:08'},
    { title: 'Good Love', duration: '3:15'},
    { title: 'Jam Jam', duration: '2:54'}
  ]
}

var currentlyPlayingSong = null;

//Dynamically generating song row content
var createSongRow = function(songNumber, songName, songLength){
  var template =
      '<tr class = "album-view-song-item">'
    + '   <td class="song-item-number" data-song-number = "' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return template
};

/* #1  we select all HTML elements that are required to display on the album
We want to populate these elements with information, so we assign the
corresponding values of the album objects' properties to the HTML elements. */

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


var setCurrentAlbum = function(album) {

  /* #2
  firstChild property identifies the firstchild node of an element, and nodeValue
  returns or sets the value of a node.
  Example .albumTitle element only has one node and it's text. When we use
  firstchild and nodevalue properties together on it, we set the value of that
  text node to album.title */
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);


  /* #3 we initially set the value of the parent container's innerHTML to an
  empty string to ensure that we were working with a clean slate! */
  albumSongList.innerHTML = '';


  /* #4 we use for loop to go through all the songs from the specified album
  object and insert them into the HTML using innerHTML. createSongRow function
  is called at each loop, passing in the information from our album object */
  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);

    }
};

var albums=[albumPicasso, albumMarconi, albumIU]; //create an array of the albums we want to loop for below event listener for easy access using array indices
var index = 1;
albumImage.addEventListener("click",function(event){ //click event on image which will trigger below function
    setCurrentAlbum(albums[index]); //way to access the array
    index++; //each time you click it will go to the next array index
    if (index == albums.length) { //this is for when the third album is reached, when clicked it will reclick to first one.
      index = 0;
    }
});

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


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>'

window.onload = function(){ //we create a function that sets current album to picasso
  setCurrentAlbum(albumPicasso);

  songListContainer.addEventListener('mouseover', function(event){
    if(event.target.parentElement.className === 'album-view-song-item'){
      //change the content from the number to the play button's HTML
      //event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    //conditional statement that only changes innerHTML of table cell when element does not belong to the currently playing song (checkpoint 13)
    var songItem = getSongItem(event.target);

    if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
      songItem.innerHTML = playButtonTemplate
    }
  }
    //end conditional statement
  });

  for (var i = 0; i < songRows.length; i++) {
      songRows[i].addEventListener('mouseleave', function(event) {
          // #1
          var songItem = getSongItem(event.target);
          var songItemNumber = songItem.getAttribute('data-song-number');

          // #2 conditional
          if (songItemNumber !== currentlyPlayingSong) {
              songItem.innerHTML = songItemNumber;
          }
      });

        songRows[i].addEventListener('click', function(event) {
          //Event Handler call checkpoint 13
          clickHandler(event.target);
        });
    }
};
