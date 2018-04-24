import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';

export class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
		this.state = {search: '', searchDone: false, lastSearch: ''};
	}

	handleSearch(event) {
		event.preventDefault();
    this.setState({searchDone: true});
    this.setState({lastSearch: this.state.search});
    if(window.location.pathname.substr(0,8) === '/search/') {
    	this.onUpdate();
    }
	}

	onUpdate() {
	  this.props.onUpdate(this.state.search);
  }

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
  }

  componentDidUpdate() {
		if (this.state.searchDone) {
			this.setState({searchDone: false});
		}
	}

  render() {
	  if (this.state.searchDone) {
		  return <Redirect push to={`/search/${this.state.search}`}/>;
	  }

    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/newblogpost">Create New Blog Post</Link></li>
        <div className="search-container">
          <form onSubmit={this.handleSearch}>
            <input className="nav-search" name="search" type="text" placeholder="Search.." onChange={e => this.handleChange(e)}/>
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
	      <button>Login</button>
      </ul>
    )
  }
}

export default NavBar;