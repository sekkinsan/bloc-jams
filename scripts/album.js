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
    { title: '이 지금', duration: '4:25'},
    { title: '팔레트', duration: '3:32'},
    { title: '이런 엔딩', duration: '4:08'},
    { title: '사랑이 잘', duration: '3:15'},
    { title: '잼잼', duration: '2:54'}
  ]
}

//Dynamically generating song row content
var createSongRow = function(songNumber, songName, songLength){
  var template =
      '<tr class = "album-view-song-item">'
    + '   <td class="song-item-number">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return template;
};

/* creating a function to set the current album that the program calls
when the window loads. It will take one of our album objects as an argument
and will utilize the object's stored information by injecting it
into the template. */

var setCurrentAlbum = function(album) {
  /* #1  we select all HTML elements that are required to display on the album
  We want to populate these elements with information, so we assign the
  corresponding values of the album objects' properties to the HTML elements. */
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
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

var button = document.getElementsByTagName('img')[1];
console.log(button);

/* trying to make a function so when i click on album image, it will switch to
the next album */

window.onload = function(){
    setCurrentAlbum(albumPicasso);
    button.addEventListener("onclick", function(event));

    if (setCurrentAlbum == albumPicasso) {
      setCurrentAlbum(albumMarconi)
    }
    if (setCurrentAlbum == albumMarconi) {
      setCurrentAlbum(albumIU)
    }
    if (setCurrentAlbum == albumIU) {
      setCurrentAlbum(albumPicasso)
    }
};
