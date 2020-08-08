function js_button(id, images) {
  this.id = id;
  this.mode = 'nature';
  this.images = images[this.mode];
  this.count = 0;
  this.total = this.images.length;
  this.el = document.getElementById(id);
  this.image = document.getElementById('js_image');
  this.status = document.getElementById('js_badge');
  this.credits = document.getElementById('js_credits');

  this.el.addEventListener('click', this.swapImage.bind(this));
}


js_button.prototype.swapImage = function () {

  if (this.id == 'next') {
    js_getCounter.increase();
  } else {
    js_getCounter.decrease();
  }

  this.count = js_getCounter.currentCounter(this.total);

  var lNum = this.count - 1;
  this.status.textContent = this.count + ' of ' + this.total;
  this.image.src = 'images/' + this.images[lNum].image;

  this.credits.textContent = this.images[lNum].title + ' - ' + this.images[lNum].photographer;
}

var assignCounter = function () {
  var lCounter = 0;

  function changeBy(val) {
    lCounter += val;
  }

  return {
    increase: function () {
      changeBy(1);
    },

    decrease: function () {
      changeBy(-1);
    },

    currentCounter: function (pTotal) {
      if (lCounter > pTotal) {
        lCounter = 1;
      } else if (lCounter < 1) {
        lCounter = pTotal;
      }
      return lCounter;
    }
  }
}

var js_getCounter = assignCounter();

function JS_APPInit(data) {
  var btnPrev = new js_button('prev', data);
  var btnNext = new js_button('next', data);
  document.getElementById('js_mode').textContent = btnNext.mode;
  btnNext.swapImage();
}



var request = new XMLHttpRequest();
request.open('GET', 'json/images.json', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // file is found and loaded
    var data = JSON.parse(request.responseText);
    // console.log(data);
    JS_APPInit(data);
  } else {
    var lMessage = request.status + ' File not found!';
    alert(lMessage);
  }
}

request.send();
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
var vueApp = new Vue({
  el: '#vue_app',
  data: {
    title: 'Vue.js',
    mode: 'animals',
    image: '',
    count: 1,
    total: 0,
    next: null,
    images: null,
  },
  methods: {
    buttonClick(e) {
      this.next = e.target.className.indexOf('right') != -1 ? true : false;

      if (this.next) {
        this.count++;
        if (this.count > this.total) {
          this.count = 1;
        }
      } else {
        this.count--;
        if (this.count < 1) {
          this.count = this.total;
        }
      }

      this.image = this.images[this.count - 1].image;
    },

    loadImageJson() {
      var self = this;
      fetch('./json/images.json')
        .then(function (response) {
          if (response.status !== 200) {
            console.log('Fetch error:', response.status);
            return;
          }
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          self.images = data[self.mode];
          self.image = self.images[0].image;
          self.total = self.images.length;
        });
    },
  },
  created() {
    this.loadImageJson();
  },
  computed: {
    displayCount() {
      return this.count + ' of ' + this.total;
    },
    assignCredits() {
      var lNum = this.count - 1;
      return this.images === null
        ? ''
        : this.images[lNum].title + ' - ' + this.images[lNum].photographer;
    },
  },
});
