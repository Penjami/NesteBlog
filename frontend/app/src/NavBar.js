import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';

export class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleBurgerMenu = this.handleBurgerMenu.bind(this);
		this.closeBurgerNav = this.closeBurgerNav.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
		this.state = {search: '', searchDone: false, lastSearch: ''};
	}

	handleSearch(event) {
		event.preventDefault();
		if(this.state.search !== "") {
			this.setState({searchDone: true});
			this.setState({lastSearch: this.state.search});
			if (window.location.pathname.substr(0, 8) === '/search/') {
				this.onUpdate();
			}
		}
	}

	onUpdate() {
	  this.props.onUpdate(this.state.search);
  }

	handleBurgerMenu() {
		console.log(this.refs.burgerNavigation.style.display);
		if(this.refs.burgerNavigation.style.display === 'none' ||
			this.refs.burgerNavigation.style.display === '') {
			console.log("jee");
			this.refs.burgerNavigation.style.display = 'block'
		} else {
			this.refs.burgerNavigation.style.display = 'none'
		}
	}

	closeBurgerNav() {
		if(document.documentElement.clientWidth > 499) {
			this.refs.burgerNavigation.style.display = 'none'
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.closeBurgerNav);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.closeBurgerNav);
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
	    <div>
	    <ul>
		    <div className="burgerButton" onClick={this.handleBurgerMenu}>
			    <div className="burger"></div>
			    <div className="burger"></div>
			    <div className="burger"></div>
		    </div>
		    <div className="normalNav">
			    <li><Link to="/">Home</Link></li>
			    <li><Link to="/newblogpost">Create New Blog Post</Link></li>
		    </div>
		    <div className="search-container">
			    <form onSubmit={this.handleSearch}>
				    <input className="nav-search" name="search" type="text" placeholder="Search.." onChange={e => this.handleChange(e)}/>
				    <button type="submit"><i className="fa fa-search"></i></button>
			    </form>
		    </div>
	    </ul>
	    <div ref="burgerNavigation" className="burgerNavigation">
			  <ul className="navigationBarStyle">
			  <li><Link to="/">Home</Link></li>
			  <li><Link to="/newblogpost">Create New Blog Post</Link></li>
			  </ul>
		  </div>
</div>
    )
  }
}

export default NavBar;