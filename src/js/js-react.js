class ReactApp extends React.Component {
  render() {
    return ( <
      div >
      <
      div className = "col-12 bg-dark" >
      <
      h1 > React < span > < /span> </h1 >
      <
      /div>

      <
      /div>
    )
  }
}

ReactDOM.render( <
  ReactApp / > ,
  document.getElementById('react_app')
)