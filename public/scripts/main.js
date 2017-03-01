$(document).ready(function() {

  $.get( "/movies", function(data) { // GET DATA AND APPEND TO TABLE

    for (var i = 0; i < data.length; i++) {

      $( ".table-body" ).append("<tr class='" + data[i].title + "'><td class='movie-title'>" + data[i].title + "</td><td class='movie-director'>" + data[i].director + "</td><td class='movie-year'>" + data[i].year + "</td><td class='movie-Rating'>" + data[i].myRating + "</td><td><p data-placement='top' data-toggle='tooltip' title='Show'><button class='btn btn-primary btn-block showBtn' id='" + data[i].title + "' data-title='Show' data-toggle='modal' data-target='#show' data-poster='" + data[i].posterURL + "'><span class='text'>Show</span></button></p></td><td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-block editBtn' id='" + data[i].title + "' data-title='Edit' data-toggle='modal' data-target='#edit' data-poster='" + data[i].posterURL + "'><span class='glyphicon glyphicon-pencil'></span></button></p></td><td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-block deleteBtn' id='" + data[i].title + "'  data-title='Delete' data-toggle='modal' data-target='#delete' data-poster='" + data[i].posterURL + "'><span class='glyphicon glyphicon-trash'></span></button></p></td></tr>")
    }

  }).then(function(data) { ////////// EDIT MOVIE \\\\\\\\\\\\

    var movieToEdit;
    var movieId;

    $(".editBtn").on("click",  function() {

      movieToEdit = $(this).closest('tr')
      movieId = $(this).attr('id')


      $("#edit-heading").empty()
      $("#edit-heading").append(movieId).text()

      var tableRow = $(this).parent().parent().siblings();
      var grabPoster = $(this).data("poster")
      console.log(grabPoster);

      var rowObj = {};

      rowObj.title = tableRow[0].innerText;
      rowObj.director = tableRow[1].innerText;
      rowObj.year = tableRow[2].innerText;
      rowObj.myRating = tableRow[3].innerText;
      rowObj.posterURL = grabPoster

      $('.editTitle').val(rowObj.title)
      $('.editDirector').val(rowObj.director)
      $('.editYear').val(rowObj.year)
      $('.editRating').val(rowObj.myRating)
      $('.editURL').val(rowObj.posterURL)

    })

    $( ".updateModBtn" ).click(function() {

      var movieTitle = $('.editTitle').val()
      var movieDirector = $('.editDirector').val()
      var movieYear = $('.editYear').val()
      var movieRating = $('.editRating').val()
      var movieURL = $('.editURL').val()


      $.ajax({
        url: '/movies/' + movieId,
        type: 'PUT',
        data: {
          "title": movieTitle,
          "director": movieDirector,
          "year": movieYear,
          "myRating": movieRating,
          "posterURL": movieURL
        },
        success: function(result) {
        }
      }).then(function(result) {
        // $('#edit').modal('hide')
        window.location.reload(true)
      })
    })

    return data

  }).then(function(data) { ////////// DELETE MOVIE \\\\\\\\\\\\

    var movieToDelete;
    var movieId;

    $( ".deleteBtn" ).click(function() {
      movieToDelete = $(this).closest('tr')
      movieId = $(this).attr('id')
      console.log(movieId);
    })

    $( ".yesModBtn" ).click(function() {
      console.log(movieId);
      $.ajax({
        url: '/movies/' + movieId,
        type: 'DELETE',
        success: function(result) {
          movieToDelete.remove()
        }
      }).then(result => $('#delete').modal('hide'))
    })

    return data

  }).then(function(data) { ////////// SHOW MOVIE \\\\\\\\\\\\

    var movieToShow;
    var movieId;

    $(".showBtn").on("click",  function() {

      movieToShow = $(this).closest('tr')
      movieId = $(this).attr('id')

      $("#show-heading").empty()
      $("#show-heading").append(movieId).text()

      var tableRow = $(this).parent().parent().siblings();
      var grabPoster = $(this).data("poster")
      console.log(grabPoster);

      var rowObj = {};

      rowObj.title = tableRow[0].innerText;
      rowObj.director = tableRow[1].innerText;
      rowObj.year = tableRow[2].innerText;
      rowObj.myRating = tableRow[3].innerText;

      $('.showTitle').empty()
      $('.showDirector').empty()
      $('.showYear').empty()
      $('.showRating').empty()
      $('.showTitle').append(rowObj.title);
      $('.showDirector').append(rowObj.director);
      $('.showYear').append(rowObj.year);
      $('.showRating').append(rowObj.myRating);
      $('.poster').remove()
      $('.showBody').prepend("<img src='" + grabPoster + "'class='modal-content poster img-responsive' id='" + grabPoster + "'>")

    })
  })



  $(".new-button").on("click", function(e) { ///////// CREATE MOVIE \\\\\\\\\\

    var newMovieObj = {}
    var postTitle = $('.newTitle').val()
    var postDirector = $('.newDirector').val()
    var postYear = $('.newYear').val()
    var postRating = $('.newRating').val()
    var postURL = $('.newURL').val()


    if(postTitle=='' && postDirector=='' && postYear =='' && postRating =='' && postURL =='') {
      alert("Please fill out the form")
    } else if(postTitle=='') {
      alert('Title is required')
    } else if(postDirector=='') {
      alert('Director is required')
    } else if(postYear=='') {
      alert('Year is required')
    } else if(postRating=='') {
      alert('Rating is required')
    } else if(postURL=='') {
      alert('URL is required')
    } else {

      $.ajax({
        url: '/movies',
        type: 'POST',
        data: {
          "title": postTitle,
          "director": postDirector,
          "year": postYear,
          "myRating": postRating,
          "posterURL": postURL,
        },
        success: function(result) {


            $( ".table-body" ).append("<tr class='" + postTitle + "'><td class='movie-title'>" + postTitle + "</td><td class='movie-director'>" + postDirector + "</td><td class='movie-year'>" + postYear + "</td><td class='movie-Rating'>" + postRating + "</td><td><p data-placement='top' data-toggle='tooltip' title='Show'><button class='btn btn-primary btn-block showBtn' id='" + postTitle + "' data-title='Show' data-toggle='modal' data-target='#show' data-poster='" + postURL + "'><span class='text'>Show</span></button></p></td><td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-block editBtn' id='" + postTitle + "' data-title='Edit' data-toggle='modal' data-target='#edit' data-poster='" + postURL + "'><span class='glyphicon glyphicon-pencil'></span></button></p></td><td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-block deleteBtn' id='" + postTitle + "'  data-title='Delete' data-toggle='modal' data-target='#delete' data-poster='" + postURL + "'><span class='glyphicon glyphicon-trash'></span></button></p></td></tr>")

            $('#new').modal('hide');


        }
      })
    }
  })
})
