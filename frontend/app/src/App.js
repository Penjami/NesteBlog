import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
    this.onDelete = this.onDelete.bind(this);
    this.loadBlogpostsFromDB = this.loadBlogpostsFromDB.bind(this);
  }

  onDelete(blogPost) {
    // this.setState({blogPosts: this.state.blogPosts.splice(blogPost.id - 1, 1)});
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

class BlogPost extends React.Component{

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
