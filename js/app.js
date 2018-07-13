/** @jsx React.DOM */
let API = "http://aicams.ca:5000/"
let DEFAULT_QUERY ="urls?list=1"

var URLlist = React.createClass({
  
    getInitialState:function(){
        return{
          sortedArr:[],
          regArray:[],
          data: [],
          delBttn: '<span class= "glyphicon glyphicon-remove" aria-hidden="true"></span><span><strong>Delete</strong></span>',      
        }
    },

    buttonClick() {
        console.log("Bttn clicked here");
        loadData();
    },

    loadData(){
        this.setState({ isLoading: true });
        console.log(" start:")
        fetch(API + DEFAULT_QUERY)
            .then(response => {
                console.log(" response:" + response)
                if (response.ok) {
                    //console.log(" response:" + JSON.stringify(response, null, 2) )
                    return response.json();
                } else {
                    console.log(" error:")
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ data: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    },

    componentDidMount() {
        loadData();
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
            &nbsp;<a href="//aicams.ca:5000/urls?delete={data[1]}" onClick={this.buttonClick.bind(this)} class="btn btn-primary a-btn - slide - text" dangerouslySetInnerHTML={{ __html: this.state.delBttn }} />
            </li>
          )}
        </ul>
      );
    }
})

React.renderComponent(<URLlist/>, document.getElementById('app'));