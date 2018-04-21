import React from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./NavBar";

export class ModifyBlogPost extends React.Component {

  constructor(props) {
    super(props);
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
    this.state = {id: '', author: '', title: '', content: '', redirect: false};
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    fetch(`/api/blogposts/${params.blogPostId}`, {
      accept: 'application/json',
    }).then((response) => {
      return response.json();
    }).then(response => {
      this.setState({id: response.id, author: response.author, title: response.title, content: response.content});
    });
  }

  handleBlogSubmit(event) {
    event.preventDefault();

    fetch('/api/blogposts/'+this.state.id, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: this.state.author,
        content: this.state.content,
        title: this.state.title
      })}).then((result)=> {
      console.log(result);
    }).then(()=> {
      this.setState({ author: '', title: '', content: ''});
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
        <form onSubmit={this.handleBlogSubmit}>
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

export default ModifyBlogPost;