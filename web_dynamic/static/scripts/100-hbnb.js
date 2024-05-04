$(document).ready(init);

const HOST = '0.0.0.0';

function init () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });

  apiStatus();
}

function apiStatus () {
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
document.querySelectAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        const { id, checked } = event.target;
        if (checked) {
            selectedItems[id] = true;
        } else {
            delete selectedItems[id];
        }
        updateLocations();
    });
});
function fetchplaces_url() {
  const places_url = `http://0.0.0.0:5001/api/v1/places_search/`;
  $.ajax({

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({amenities: Object.values(amenityObj)}),
    success: function (response) {
    $("SECTION.places").empty();
      for (const k of response) {
        const article = [
          "<article>",
          '<div class="title_box">',
          `<h2>${k.name}</h2>`,
          `<div class="price_by_night">$${k.price_by_night}</div>`,
          "</div>",
          '<div class="information">',
          `<div class="max_guest">${k.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${k.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${k.number_bathrooms} Bathroom(s)</div>`,
          "</div>",
          '<div class="description">',
          `${k.description}`,
          "</div>",
          "</article>",
        ];
        $("SECTION.places").append(article.join(""));
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
  
