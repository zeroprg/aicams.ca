
/** @jsx React.DOM */
let API = "http://aicams.ca:5000/"
let DEFAULT_QUERY ="urls?list=1"
let URL = API + "urls"
let deleteURL = URL + "?delete="
var URLlist = React.createClass({

    getInitialState: function () {
        return {
            sortedArr: [],
            regArray: [],
            data: [],
        }
    },

    buttonClick(data) {
        console.log("Bttn clicked here");
        fetch(data)
             .then(response => {
                console.log(" response:" + response)
                if (response.ok) {
                    console.log(" response:" + JSON.stringify(response, null, 2) ); 
                    this.loadData();
                    return response.json();
                } else {
                    console.log(" error:")
                    throw new Error('Something went wrong ...');
                }
            })
    },

    loadData() {
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
            .then(data => this.setState({ data: data, url: deleteURL, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    },


    componentDidMount() {
        this.loadData()
    },

    render() {
        const { data, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <ul>
                {data.map(data =>
                    <li key={data[0]}>
                        <a href={data[1]}>{data[1]}</a>
                        &nbsp;
              <a href="#" onClick={() => this.buttonClick(this.state.url+data[1])} className="btn btn-primary a-btn - slide - text">
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            <span>
                                <strong>Delete</strong>
                            </span>
                        </a>
                    </li>
                )}
            </ul>
        );
    }

})

React.renderComponent(<URLlist />, document.getElementById('URLlist'));
