
$(function()
{
  

  $.ajax({url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`, success: function(result)//get api call for charts
  {
    var charts=result;//stors results in a variable
    console.log(charts);
     
      for(var i = 0; i < 9 ; i++)
      {
            var songName = charts.tracks.data[i].title;//gets songname
            var artist = charts.tracks.data[i].artist.name;//gets artist name
            var rank = charts.tracks.data[i].position;//gets rank
            var Albumid=charts.tracks.data[i].album.id;// used to find the id of the album so you can pull the individual albums later
           
            ChangeStuff( songName, artist, rank, Albumid);//puts it all into a function
            document.body.className = "loaded";
      }
}});

});//for main function

let j = 0;  
let i = 1;

function ChangeStuff( songName, artist, rank, Albumid)
{
      $.ajax({url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/`+Albumid, success: function(returned)
      {

          var albumObject=returned;
      
        //  var Albumactualid=albumObject.id;
          for(var n=0; n<8; n++)
          {        
            var Albumactualid=albumObject.id;//store the id of the albums
            //console.log(albumObject);
            var genre=albumObject.genres.data[0].name;
            var label=albumObject.label;
            var imageurl=albumObject.cover_medium;
          
          }

        j++;
        
        if(j % 3 === 0)
        {
          buildCards(songName, artist, rank, genre, label, imageurl, i);
          ++i;
        } 
          else 
          {
            buildCards(songName, artist, rank, genre, label,  imageurl, i);
          }

     // console.log(Albumactualid);
console.log(albumObject);

// console.log(albumObject.label);
      }});
};//end of function
              

function buildCards( songName, artist, rankArtist, genreArtist, labelArtist , imgSrc, i )
{
  // UI var
  let cardHolder = document.querySelector(`.albumContainer${i}`);

  // Create outer div
  const outerCard = document.createElement('div');
  // Add class
  outerCard.className = 'box';
 

  // Create inner div
  const innerCard = document.createElement('div');
  // Add class 
  innerCard.className = `boxinner ${genreArtist}`;
  // Add id containing artist
  innerCard.id = `${songName} ${artist}`;
  // Append inner box to outer box
  outerCard.appendChild(innerCard);
   

  // Create div for front card
  // Create div element
  const cardFront = document.createElement('div');
  // Add class
  cardFront.className = 'boxfront';
  // Create a img element
  const artistImg = document.createElement('img');
  // Add img src
  artistImg.src = imgSrc;
  // Append img to card
  cardFront.appendChild(artistImg);
  // Create a h3 element
  const artistName = document.createElement('h3');
  const artistText = document.createTextNode(artist);
  artistName.appendChild(artistText);

  const sName = document.createElement('h3');
  const sText = document.createTextNode(songName);
  sName.appendChild(sText);
  //  Add class to h3
  artistName.className = 'artist-name';
  cardFront.appendChild(artistName);
  cardFront.appendChild(sName);
 

  // Append front card to inner card
  innerCard.appendChild(cardFront);

  // Create div for back card
  const cardBack = document.createElement('div');
  // Add class
  cardBack.className = 'boxback';

  // Create 5 p element for track info
  const genre = document.createElement('p');
  const genreText = document.createTextNode("Genre: "+genreArtist);
  genre.appendChild(genreText);

  const label = document.createElement('p');
  const labelText = document.createTextNode("Label: "+labelArtist);
  label.appendChild(labelText);

  const rank = document.createElement('p');
  const rankText = document.createTextNode("Chart rank: "+rankArtist);
  rank.appendChild(rankText);


  // Append all p tags to back card
  cardBack.appendChild(genre);
  cardBack.appendChild(label);
  cardBack.appendChild(rank);


  // Append back card to inner card
  innerCard.appendChild(cardBack);

  // Add to album container div
  cardHolder.appendChild(outerCard);
}

// Get UI variable for search
let searchInput = document.querySelector('#search');

// Search function
function search(e) {
  const text = e.target.value.toLowerCase();

    document.querySelectorAll('.box').forEach(function(task){
        const item = task.firstChild.id;

        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        } 
          else 
          {
              task.style.display = 'none';
              console.log(item);
          }
    });
}

// // Add event listener for key up to call function
 searchInput.addEventListener('keyup', search);