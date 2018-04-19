import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

export class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {search: '', searchDone: false};
	}

	handleSearch(event) {
		event.preventDefault();

		fetch('/api/blogposts/'+this.state.id, {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				author: this.state.author,
				content: this.state.content,
				title: this.state.title
			})}).then((result)=> {
			console.log(result);
		}).then(()=> {
			this.setState({ author: '', title: '', content: ''})
		}).then(this.setState({searchDone: true}));
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a>Contact</a></li>
        <li><a>About</a></li>
        <li><Link to="/newblogpost">Create New Blog Post</Link></li>
        <div class="search-container">
          <form action="/action_page.php" onSubmit={this.handleSearch}>
            <input className="nav-search" type="text" placeholder="Search.." onChange={e => this.handleChange(e)}/>
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </ul>
    )
  }
}

export default NavBar;