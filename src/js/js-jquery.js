function jsNav(e) {
  $('.nav-link').removeClass('active');
  $(e).addClass('active');

  $('.ss-containers').addClass('d-none');
  $('#' + e.textContent.toLowerCase() + '_app').removeClass('d-none');
}

function jq_button(app, obj, images, isNext) {
  this.el = obj;
  this.el.count = 0;
  this.el.mode = 'food';
  this.el.images = images[this.el.mode];
  this.el.total = this.el.images.length;
  this.el.image = $(app).find('img')[0];
  this.el.status = $(app).find('.badge')[0];
  this.el.credits = $(app).find('.photo-credits')[0];
  this.el.next = isNext;

  $($(app).find('span')[0]).text(this.el.mode);

  $(obj).on('click', function () {
    if (this.next) {
      jq_getCounter.increase();
    } else {
      jq_getCounter.decrease();
    }

    this.count = jq_getCounter.currentCounter(this.total);

    var lNum = this.count - 1;
    $(this.status).text(this.count + ' of ' + this.total);
    $(this.image).attr('src', 'images/' + this.images[lNum].image).hide().fadeIn();
    $(this.credits).text(this.images[lNum].title + ' - ' + this.images[lNum].photographer);
  });
}

var jq_getCounter = assignCounter();

$.getJSON('json/images.json', function (data) {
  console.log(data);
  var lprev = $('#jquery_app button')[0];
  var lnext = $('#jquery_app button')[1];
  new jq_button('#jquery_app', lprev, data, false);
  new jq_button('#jquery_app', lnext, data, true).el.click();
}).fail(function (jqxhr, textStatus, error) {
  console.log('JSON error ' + error);
});