import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';

export class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {search: '', searchDone: false};
	}

	handleSearch(event) {
		event.preventDefault();
		this.setState({searchDone: true});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

  render() {
	  if (this.state.searchDone) {
		  return <Redirect push to={`/search/${this.state.search}`}/>;
	  }

    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/newblogpost">Create New Blog Post</Link></li>
        <div class="search-container">
          <form action="/action_page.php" onSubmit={this.handleSearch}>
            <input className="nav-search" name="search" type="text" placeholder="Search.." onChange={e => this.handleChange(e)}/>
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </ul>
    )
  }
}

export default NavBar;