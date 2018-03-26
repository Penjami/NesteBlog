import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {blogPosts: []};
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
            <BlogPostList blogPosts={this.state.blogPosts}/>
        )
    }
}

class BlogPostList extends React.Component{
  render() {
    let blogPosts = this.props.blogPosts.map(blogPost =>
      <BlogPost blogPost={blogPost}/>
    );
    return (
      <table>
        <tbody>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Content</th>
        </tr>
        {blogPosts}
        </tbody>
      </table>
    )
  }
}

class BlogPost extends React.Component{
  render() {
    return (
      <tr>
        <td>{this.props.blogPost.author}</td>
        <td>{this.props.blogPost.title}</td>
        <td>{this.props.blogPost.content}</td>
      </tr>
    )
  }
}

export default App;
