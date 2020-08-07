function jsNav(e) {
  $('.nav-link').removeClass('active');
  $(e).addClass('active');

  $('.ss-containers').addClass('d-none');
  $('#' + e.textContent.toLowerCase() + '_app').removeClass('d-none');
}

$.getJSON('json/images.json', function (data) {
  console.log(data);
}).fail(function (jqxhr, textStatus, error) {
  console.log('JSON error ' + error);
})