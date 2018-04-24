import React from 'react';
import {Link} from 'react-router-dom';
import {createFilter} from 'react-search-input';
import './App.css';
import NavBar from "./NavBar";

const KEYS_TO_FILTERS = ['author', 'title']

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {searchBlogPosts: [], searchString: ''};
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.searchString);
    this.setState({searchString: params.searchString});
    this.loadBlogpostsFromDB();
  }

  onUpdate(searchString) {
    this.setState({searchString: searchString});
    this.loadBlogpostsFromDB();
  }

  loadBlogpostsFromDB() {
    fetch(`/api/blogposts`, {
      accept: 'application/json',
    }).then((response) => {
      return response.json();
    }).then(response => {
      this.setState({searchBlogPosts: response.filter(createFilter(this.state.searchString, KEYS_TO_FILTERS))});
    });
  }

  render() {
    if(this.state.searchBlogPosts.length === 0) {
	    return (
        <div>
          <NavBar onUpdate={this.onUpdate}/>
          <p>Your search did not return any results</p>
        </div>
	    )
    } else {
	    return (
        <div>
          <NavBar onUpdate={this.onUpdate}/>
          <BlogPostList blogPosts={this.state.searchBlogPosts}/>
          <footer></footer>
        </div>
	    )
    }
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