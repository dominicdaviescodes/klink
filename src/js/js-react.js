class ReactApp extends React.Component {

  constructor() {
    super();
    this.state = {
      count: 0,
      total: 0,
      mode: 'nature',
      images: [],
      image: '',
      credits: ''
    }
  }
  componentDidMount() {
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
        console.log(data);
        self.setState({
          images: data. [self.state.mode]
        });
        self.setState({
          image: data[self.state.mode][0].image
        });
        self.setState({
          total: data[self.state.mode].length
        });
      })
  }

  render() {
    return ( <
      div >
      <
      div className = "col-12 bg-dark" >
      <
      h1 > React < span > < /span></h1 >
      <
      /div> <
      div className = "col-12 p-0" >
      <
      img className = "img-fluid"
      src = "" / >
      <
      div className = "photo-credits" > < /div> < /
      div > <
      div className = "col bg-dark text-center p-2 button-controls" >
      <
      span className = "badge badge-light" > 4 < /span></div >
      <
      /div>
    )
  }
}

ReactDOM.render( < ReactApp / > ,
  document.getElementById('react_app')
)