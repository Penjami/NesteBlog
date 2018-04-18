import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
    this.onModify = this.onModify.bind(this);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
    this.state = {blogPosts: [], id: '', author: '', title: '', content: '', modify: false};
  }

  onDelete(blogPost) {
    this.deleteBlogPost(blogPost.id);
  }

  componentDidMount() {
    this.loadBlogpostsFromDB();
  }

  onModify(blogPost) {
    this.setState({id: blogPost.id, modify: true});
  }

  deleteBlogPost(index) {
    fetch(`/api/blogposts/` + index, {
      method: 'delete',
    }).then(this.loadBlogpostsFromDB);
  }

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
    const iterator = data.entries()

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

  render() {
    if (this.state.modify) {
      return <Redirect push to={`/modifyblogpost/${this.state.id}`}/>;
    }

    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a>Contact</a></li>
          <li><a>About</a></li>
          <li><Link to="/newblogpost">Create New Blog Post</Link></li>
        </ul>
        <BlogPostList onDelete={this.onDelete} onModify={this.onModify} blogPosts={this.state.blogPosts}/>
        <footer></footer>
      </div>
    )
  }
}

class BlogPostList extends React.Component {
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

export default Home;