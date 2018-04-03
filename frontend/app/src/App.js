import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
	  this.switchToDifferentPage = this.switchToDifferentPage.bind(this);
	  this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
	  this.renderNewBlogPost = this.renderNewBlogPost.bind(this);
	  this.renderPage = this.renderPage.bind(this)
	  this.state = {blogPosts: [], pageState: 'HOME',
		  pageStates: ['HOME', 'NEWPOST', 'ABOUT']};
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
    });
  }

  render() {
        return (
            <page>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">About</a></li>
                <input type="text" placeholder="Search.."></input>
              </ul>
              <BlogPostList onDelete={this.onDelete} blogPosts={this.state.blogPosts}/>
              <footer></footer>
            </page>
        )
    }
	handleBlogSubmit(event) {
		const data = new FormData(event.target);

		fetch('/blogposts/', {
			method: 'POST',
			body: data,
		});
	}

	switchToDifferentPage(page) {
		this.setState({pageState: page})
	}

	renderHome() {
		return (
			<page>
				<ul>
					<li><button onClick={this.switchToDifferentPage(this.state.pageStates[0])}>Home</button></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><button onClick={this.switchToDifferentPage(this.state.pageStates[1])}>Create New Blog Post</button></li>
					<input type="text" placeholder="Search.."></input>
				</ul>
				<BlogPostList blogPosts={this.state.blogPosts}/>
				<footer></footer>
			</page>
		)
	}

	renderNewBlogPost() {
		return (
			<page>
				<ul>
					<li><a>Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a onClick={this.switchToDifferentPage}>Add New Blog Post</a></li>
					<input type="text" placeholder="Search.."></input>
				</ul>
				<form onSubmit={this.handleBlogSubmit}>
					<input type='text' name='author' />
					<input type='text' name='title' />
					<input type='text' name='content' />
				</form>
				<footer></footer>
			</page>
		)
	}

	renderAbout() {
		return (
			<page>
				<ul>
					<li><a href="" onClick={this.switchToDifferentPage(this.state.pageStates[0])}>Home</a></li>
					<li><a>Contact</a></li>
					<li><a>About</a></li>
					<li><a href="" onClick={this.switchToDifferentPage(this.state.pageStates[1])}>Add New Blog Post</a></li>
					<input type="text" placeholder="Search.."></input>
				</ul>
				<BlogPostList blogPosts={this.state.blogPosts}/>
				<footer></footer>
			</page>
		)
	}

	renderPage() {
		if (this.state.pageState == this.state.pageStates[0]) {
			return this.renderHome();
		} else if (this.state.pageState == this.state.pageStates[1]){
			return this.renderNewBlogPost();
		} else {
			return this.renderAbout();
		}
	}

	render() {

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
		//return this.renderPage();
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
