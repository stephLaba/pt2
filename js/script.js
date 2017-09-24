      var app = {};

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();



        $('.main__form').on('submit', function(e) {
            e.preventDefault();
            geocodeAddress(geocoder, map);
            var dogType = $('[name=doggo]').val();
            var postalCode = $('[name=city]').val();
            getDogs(dogType, postalCode);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }


      var locations = [];

         var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 10,
           center: new google.maps.LatLng(-33.92, 151.25),
           mapTypeId: google.maps.MapTypeId.ROADMAP
         });

         var infowindow = new google.maps.InfoWindow();

         var marker, i;

         for (i = 0; i < locations.length; i++) {  
           marker = new google.maps.Marker({
             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
             map: map
           });

           google.maps.event.addListener(marker, 'click', (function(marker, i) {
             return function() {
               infowindow.setContent(locations[i][0]);
               infowindow.open(map, marker);
             }
           })(marker, i));
         }

      function makeDogHTML(listOfDogs) {
        var html = listOfDogs.map(function(dog) {
          console.log(dog);

          var dogMarker = dog.contact.zip.$t;
          console.log(dogMarker);

          return `
            <div class="dog">
              <h3>${dog.name.$t}</h3>
              <div class="image__container">
                <img src="${dog.media.photos.photo[2].$t}">
              </div>
            </div>
          `;
        }).join('');
        return html;
      }

      function getDogs(breed, postalCode) {
        $.ajax({
            type : 'GET',
            data : {
              key:'028653919ff2d16aaab2ab37b9240d26',
              location: postalCode,
              format: 'json',
              callback: 'what',
              breed: breed,
              animal: 'dog'
            },
            url : 'http://api.petfinder.com/pet.find',
            dataType: 'jsonp',
            success : function(data) {
              console.log(data);
                // run a function to generate the html for the dogs!
                var dogHTML = makeDogHTML(data.petfinder.pets.pet)

                $('.map__section__results').html(dogHTML);
            },
        });
      }

      function getBreeds() {
        $.ajax({
            type : 'GET',
            data : {
              key:'028653919ff2d16aaab2ab37b9240d26',
              format: 'json',
              animal: 'dog',
              callback: 'what'
            },
            url : 'http://api.petfinder.com/breed.list',
            dataType: 'jsonp',
            success : function(data) {
               console.log(data);
            },
        });
      }


