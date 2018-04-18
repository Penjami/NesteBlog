import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './App.css';

/*
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
	  this.onModify = this.onModify.bind(this);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
	  this.switchToNewBlog = this.switchToNewBlog.bind(this);
    this.switchToHome = this.switchToHome.bind(this);
	  this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
	  this.renderNewBlogPost = this.renderNewBlogPost.bind(this);
	  this.renderPage = this.renderPage.bind(this)
	  this.state = {blogPosts: [], pageState: 'HOME',
		  pageStates: ['HOME', 'NEWPOST', 'ABOUT'],
      author: '', title: '', content: ''};
  }

  onDelete(blogPost) {
    this.deleteBlogPost(blogPost.id);
  }


	onModify(blogPost) {
		this.setState({pageState: this.state.pageStates[1], author: blogPost.author, title: blogPost.title, content: blogPost.content})
	}

  deleteBlogPost(index) {
    fetch(`/api/blogposts/` + index, {
      method: 'delete',
    }).then(this.loadBlogpostsFromDB);
  }

  componentDidMount() {
    this.loadBlogpostsFromDB();
  }

  // Load students from database
  loadBlogpostsFromDB() {
    fetch(`/api/blogposts`, {
        accept: 'application/json',
      }).then((response) => {
      return response.json();
      }).then(response => {
      this.setState({blogPosts: response});
    }).then(this.loadBlogpostsFromDB);;
  }

	handleBlogSubmit(event) {
    event.preventDefault();
		const data = new FormData(event.target);

		fetch('/api/blogposts/', {
			method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: this.state.author,
        content: this.state.content,
        title: this.state.title
		})}).then((result)=> {
		  console.log(result);
    }).then(this.switchToHome).then(()=> {
			this.setState({ author: '', title: '', content: ''})
		});

	}

	handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

	switchToNewBlog() {
		this.setState({pageState: this.state.pageStates[1]})
	}

	switchToHome() {
    this.setState({pageState: this.state.pageStates[0]})
  }

	renderHome() {
		return (
			<page>
        <ul>
          <li><a onClick={this.switchToHome}>Home</a></li>
          <li><a>Contact</a></li>
          <li><a>About</a></li>
          <li><a onClick={this.switchToNewBlog}>Create New Blog Post</a></li>
        </ul>
				<BlogPostList onDelete={this.onDelete} onModify={this.onModify} blogPosts={this.state.blogPosts}/>
				<footer></footer>
			</page>
		)
	}

	renderNewBlogPost() {
		return (
			<page>
				<ul>
					<li><a onClick={this.switchToHome}>Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a onClick={this.switchToNewBlog}>Create New Blog Post</a></li>
				</ul>
				<form onSubmit={this.handleBlogSubmit}>
          <p>author</p>
					<input type='text' name='author' value={this.state.author} onChange={e => this.handleChange(e)}/>
          <p>title</p>
					<input type='text' name='title' value={this.state.title} onChange={e => this.handleChange(e)}/>
          <p>content</p>
					<textarea rows="4" cols="50" name='content' value={this.state.content} onChange={e => this.handleChange(e)}></textarea>
          <button type='Submit'>save</button>
				</form>
				<footer></footer>
			</page>
		)
	}

	renderAbout() {

	}

	renderPage() {
		if (this.state.pageState === this.state.pageStates[0]) {
			return this.renderHome();
		} else if (this.state.pageState === this.state.pageStates[1]){
			return this.renderNewBlogPost();
		} else {
			return this.renderAbout();
		}
	}

	render() {
		/*
		return (
			<page>
				<ul>
					<li><a href="">Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a href="">Create New Blog Post</a></li>
					<input type="text" placeholder="Search.."></input>
				</ul>
				<BlogPostList onDelete={this.onDelete} blogPosts={this.state.blogPosts}/>
				<footer></footer>
			</page>
		)
		return (
			<div>
        asdasd
			</div>)
		//return this.renderPage();
	}
}
*/
export default App;
