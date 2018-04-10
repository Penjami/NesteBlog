import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
	  this.onModify = this.onModify.bind(this);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
	  this.switchToNewBlog = this.switchToNewBlog.bind(this);
    this.switchToHome = this.switchToHome.bind(this);
	  this.handleNewBlogSubmit = this.handleNewBlogSubmit.bind(this);
    this.handleModifyBlogSubmit = this.handleModifyBlogSubmit.bind(this);
	  this.renderNewBlogPost = this.renderNewBlogPost.bind(this);
	  this.renderPage = this.renderPage.bind(this)
	  this.state = {blogPosts: [], pageState: 'HOME',
		  pageStates: ['HOME', 'NEWPOST', 'MODIFYPOST', 'ABOUT'],
      author: '', title: '', content: '', id: ''};
  }

  onDelete(blogPost) {
    this.deleteBlogPost(blogPost.id);
  }


	onModify(blogPost) {
		this.setState({author: blogPost.author, title: blogPost.title, content: blogPost.content, id: blogPost.id});
    this.switchToModifyBlog();
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
    }).then(this.loadBlogpostsFromDB);
  }

	handleNewBlogSubmit(event) {
    event.preventDefault();

		fetch('/blogposts/', {
			method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: this.state.author,
        content: this.state.content,
        title: this.state.title
		})}).then((result)=> {
		  console.log(result);
    }).then(this.switchToHome).then(()=> {
			this.setState({ author: '', title: '', content: ''});
		});

	}

  handleModifyBlogSubmit(event) {
    event.preventDefault();

    fetch('/blogposts/' + this.state.id, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: this.state.author,
        content: this.state.content,
        title: this.state.title
      })}).then((result)=> {
      console.log(result);
    }).then(this.switchToHome).then(()=> {
      this.setState({ author: '', title: '', content: ''});
    });

  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

	switchToNewBlog() {
		this.setState({pageState: this.state.pageStates[1]});
	}


  switchToModifyBlog() {
    this.setState({pageState: this.state.pageStates[2]});
  }

	switchToHome() {
    this.setState({pageState: this.state.pageStates[0]});
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
				<form onSubmit={this.handleNewBlogSubmit}>
          <p>author</p>
					<input type='text' name='author' value={this.state.author} onChange={e => this.handleChange(e)}/>
          <p>title</p>
					<input type='text' name='title' value={this.state.title} onChange={e => this.handleChange(e)}/>
          <p>content</p>
					<textarea rows="4" cols="50" name='content' value={this.state.content} onChange={e => this.handleChange(e)}></textarea>
          <button type='Submit'>Save New</button>
				</form>
				<footer></footer>
			</page>
		)
	}


  renderModifyBlogPost() {
    return (
			<page>
				<ul>
					<li><a onClick={this.switchToHome}>Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a onClick={this.switchToNewBlog}>Create New Blog Post</a></li>
				</ul>
				<form onSubmit={this.handleModifyBlogSubmit}>
					<p>author</p>
					<input type='text' name='author' value={this.state.author} onChange={e => this.handleChange(e)}/>
					<p>title</p>
					<input type='text' name='title' value={this.state.title} onChange={e => this.handleChange(e)}/>
					<p>content</p>
					<textarea rows="4" cols="50" name='content' value={this.state.content} onChange={e => this.handleChange(e)}></textarea>
					<button type='Submit'>Modify</button>
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
		} else if (this.state.pageState === this.state.pageStates[2]) {
			return this.renderModifyBlogPost();
		} else {
      return this.renderAbout();
    }
	}

	render() {
		return this.renderPage();
	}
}

class BlogPostList extends React.Component{
  render() {
    let blogPosts = this.props.blogPosts.map(blogPost =>
      <BlogPost blogPost={blogPost} onDelete={this.props.onDelete} onModify={this.props.onModify}/>
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
	  this.handleModify = this.handleModify.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.blogPost);
  }

	handleModify() {
		this.props.onModify(this.props.blogPost);
	}

  render() {
    return (
      <div className="blogPost" >
        <h2 className="title" >{this.props.blogPost.title}</h2>
        <p className="content" >{this.props.blogPost.content}</p>
        <p className="author" >{this.props.blogPost.author}</p>
        <button onClick={this.handleDelete}>Delete</button>
	      <button onClick={this.handleModify}>Modify</button>
      </div>
    )
  }
}

export default App;
