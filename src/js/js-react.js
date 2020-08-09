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
        self.buttonClick(true);
      })
  }

  assignImage() {
    let lImage = this.state.images[this.state.count - 1];
    this.setState({
      image: lImage.image
    });
    this.setState({
      credits: lImage.title + ' - ' + lImage.photographer
    });
  }

  buttonClick(pNext){
    if(pNext){
      this.setState({count: this.state.count + 1}, () => {this.assignImage()});
      if(this.state.count > (this.state.total - 1)){
        this.setState({count: 1});
      }
    }else {
      this.setState({count: this.state.count -1}, () => {this.assignImage()});
      if(this.state.count == 1){
        this.setState({ count: this.state.total});
      }
    }
  }

  renderButton(pNext){
    return(
      <button className="btn btn-circle rounded-circle" onClick={() => this.buttonClick(pNext)}>
        <i className={pNext ? "fa fa-arrow-circle-right" : "fa fa-arrow-circle-left"}></i>
      </button>
    )
  }

  render() {
    let lImage = this.state.image || "";
    return ( 
      <div>
        <div className="col-12 bg-dark" >
          <h1>React<span>{this.state.mode}</span></h1>
      </div> 
      <div className="col-12 p-0" >
        <img className="img-fluid" src = {"images/" + lImage} />
      <div className="photo-credits">{this.state.credits}</div> 
      </div>
      <div className="col bg-dark text-center p-2 button-controls">
        {this.renderButton(false)}
        {this.renderButton(true)}
        <span className="badge badge-light">{this.state.count} of {this.state.total}</span></div>
      </div>
    )
  }
}

ReactDOM.render( < ReactApp / > ,
  document.getElementById('react_app')
)