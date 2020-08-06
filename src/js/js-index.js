function js_button(id, images) {
  this.id = id;
  this.mode = 'art';
  this.images = images[this.mode];
  this.count = 0;
  this.total = this.images.length;
  this.el = document.getElementById(id);
  this.image = document.getElementById('js_image');
  this.status = document.getElementById('js_badge');

  this.el.addEventListener('click', this.swapImage.bind(this));
}


js_button.prototype.swapImage = function () {

  if (this.id == 'next') {
    js_getCounter.increase();
  } else {
    js_getCounter.decrease();
  }

  this.count = js_getCounter.currentCounter(this.total);
  this.image.src = 'images/' + this.images[this.count - 1].image;

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