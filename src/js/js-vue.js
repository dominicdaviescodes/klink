var vueApp = new Vue({
  el: '#vue_app',
  data: {
    title: 'Vue.js',
    mode: 'animals'
  },
  methods: {
    loadImageJson() {
      fetch('./json/images.json')
        .then(function (response) {
          if (response.status !== 200) {
            console.log('Fetch error:', response.status);
            return;
          }
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        })
    }
  },
  created() {
    this.loadImageJson();
  }
});