/** @jsx React.DOM */
let API = "http://aicams.ca:5000/"
let DEFAULT_QUERY ="urls?list=1"

var URLlist = React.createClass({
  getInitialState:function(){
    return{
      sortedArr:[],
      regArray:[],
      data: []
    }
  },
  
  componentDidMount() {
    this.setState({ isLoading: true });
    console.log(" start:" )
    fetch(API + DEFAULT_QUERY)
      .then(response => {
        console.log(" response:" + response )
        if (response.ok) {
          //console.log(" response:" + JSON.stringify(response, null, 2) )
          return response.json();
        } else {
          console.log(" error:" )
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  },
  
     render() {
      const { data, isLoading, error} = this.state;

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      return (
        <ul>
          {data.map(data =>
            <li key={data}>
              <a href={data[1]}>{data[1]}</a>
                  <a href="#" class="btn btn-primary a-btn-slide-text">
                      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                      <span><strong>Edit</strong></span>            
                  </a>        
            </li>
          )}
        </ul>
      );
    }
})

React.renderComponent(<URLlist/>, document.getElementById('app'));