import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./NavBar";

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
    this.state = {blogPosts: [], id: '', author: '', title: '', content: '', modify: false};
  }

  componentDidMount() {
    this.loadBlogpostsFromDB();
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

  render() {
    return (
      <div>
        <NavBar/>
        <BlogPostList blogPosts={this.state.blogPosts}/>
        <footer></footer>
      </div>
    )
  }
}

class BlogPostList extends React.Component {
  render() {
    let blogPosts = this.props.blogPosts.map(blogPost =>
      <Post blogPost={blogPost} />
    );
    return (
      <div>
        {blogPosts}
      </div>
    )
  }
}

class Post extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blogPost" >
        <Link to={`/blogposts/${this.props.blogPost.id}`}><h2 className="title" >{this.props.blogPost.title}</h2></Link>
        <p className="content" >{this.props.blogPost.content}</p>
        <p className="author" >- {this.props.blogPost.author} {this.props.blogPost.createDate}</p>
      </div>
    )
  }
}

export default Home;