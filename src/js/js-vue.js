var vueApp = new Vue({
  el: '#vue_app',
  data: {
    title: 'Vue.js',
    mode: 'animals',
    image: '',
    count: 1,
    next: null,
    images: null,
  },
  methods: {
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
});
