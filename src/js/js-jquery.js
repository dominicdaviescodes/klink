function jsNav(e) {
  $('.nav-link').removeClass('active');
  $(e).addClass('active');

  $('.ss-containers').addClass('d-none');
  $('#' + e.textContent.toLowerCase() + '_app').removeClass('d-none');
}