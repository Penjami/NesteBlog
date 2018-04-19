import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {createFilter} from 'react-search-input'
import './App.css';
import NavBar from "./NavBar";

const KEYS_TO_FILTERS = ['author', 'title']

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
    this.search = this.search.bind(this);
    this.state = {searchBlogPosts: [{asd: ''}],allBlogPosts: [{asd: ''}], searchString: props.searchString};
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
      this.setState({allBlogPosts: response});
    }).then(this.search);
  }

  search() {
	  this.setState({searchBlogPosts: this.state.allBlogPosts.filter(createFilter(this.state.searchString, KEYS_TO_FILTERS))});
  }

  render() {
    return (
      <div>
        <BlogPostList blogPosts={this.state.searchBlogPosts}/>
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
        <p className="author" >- {this.props.blogPost.author}</p>
      </div>
    )
  }
}

export default Search;