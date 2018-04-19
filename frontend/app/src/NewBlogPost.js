import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./NavBar";

export class NewBlogPost extends  React.Component {

  constructor(props) {
    super(props);
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
    this.state = {author: '', title: '', content: '', redirect: false};
  }


  handleBlogSubmit(event) {
    event.preventDefault();

    fetch('/api/blogposts/', {
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
    }).then(this.setState({redirect: true}));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <NavBar/>
        <form className="newBlogPost" onSubmit={this.handleBlogSubmit}>
          <p>author</p>
          <input type='text' name='author' value={this.state.author} onChange={e => this.handleChange(e)}/>
          <p>title</p>
          <input type='text' name='title' value={this.state.title} onChange={e => this.handleChange(e)}/>
          <p>content</p>
          <textarea rows="4" cols="50" name='content' value={this.state.content} onChange={e => this.handleChange(e)}></textarea>
          <button type='Submit'>save</button>
        </form>
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

export default NewBlogPost;