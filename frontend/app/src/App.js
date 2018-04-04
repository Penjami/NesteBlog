import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
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

  deleteBlogPost(index) {
    fetch(`/blogposts/` + index, {
      method: 'delete',
    }).then(this.loadBlogpostsFromDB);
  }

  componentDidMount() {
    this.loadBlogpostsFromDB();
  }

  // Load students from database
  loadBlogpostsFromDB() {
    fetch(`/blogposts`, {
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
		const iterator = data.entries()

		fetch('/blogposts/', {
			method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: this.state.author,
        content: this.state.content,
        title: this.state.title
		})}).then((result)=> {
		  console.log(result);
    }).then(this.switchToHome);

	}

	handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
				<BlogPostList onDelete={this.onDelete} blogPosts={this.state.blogPosts}/>
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
					<input type='text' name='content' value={this.state.content} onChange={e => this.handleChange(e)} />
          <button type='Submit'>save</button>
				</form>
				<footer></footer>
			</page>
		)
	}

	renderAbout() {
		return (
			<page>
				<ul>
					<li><a href="" onClick={this.switchToHome}>Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a href="" onClick={this.switchToNewBlog}>Add New Blog Post</a></li>
				</ul>
				<BlogPostList onDelete={this.onDelete} blogPosts={this.state.blogPosts}/>
				<footer></footer>
			</page>
		)
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
		)*/
		return this.renderPage();
	}
}

class BlogPostList extends React.Component{
  render() {
    let blogPosts = this.props.blogPosts.map(blogPost =>
      <BlogPost blogPost={blogPost} onDelete={this.props.onDelete}/>
    );
    return (
      <div>
        {blogPosts}
      </div>
    )
  }
}

class BlogPost extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.blogPost);
  }

  render() {
    return (
      <div className="blogPost" >
        <h2 className="title" >{this.props.blogPost.title}</h2>
        <p className="content" >{this.props.blogPost.content}</p>
        <p className="author" >{this.props.blogPost.author}</p>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }
}

export default App;
