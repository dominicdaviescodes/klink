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
  },
});
