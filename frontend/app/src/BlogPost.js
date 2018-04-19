import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./NavBar";

export class BlogPost extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
	  this.onModify = this.onModify.bind(this);
	  this.deleteBlogPost = this.deleteBlogPost.bind(this);
    this.state = {blogPost: {}, modify: false, delete: false};
  }


	onDelete(blogPost) {
		this.deleteBlogPost(blogPost.id);
	}

	onModify(blogPost) {
		this.setState({id: blogPost.id, modify: true});
	}

	deleteBlogPost(index) {
		fetch(`/api/blogposts/` + index, {
			method: 'delete',
		}).then(this.setState({delete: true}));
	}

  componentDidMount() {
    const { match: { params } } = this.props;

    fetch(`/api/blogposts/${params.blogPostId}`, {
      accept: 'application/json',
    }).then((response) => {
      return response.json();
    }).then(response => {
      response.comments.push({author: 'joe', content:'jee'});
    	this.setState({blogPost: response});

    });


  }

  render() {
	  if (this.state.modify) {
		  return <Redirect push to={`/modifyblogpost/${this.state.id}`}/>;
	  }

	  if (this.state.delete) {
		  return <Redirect push to={`/`}/>;
	  }

    return (
      <div>
        <NavBar/>
        <Post blogPost={this.state.blogPost} onDelete={this.onDelete} onModify={this.onModify}/>
        <CommentList blogPost={this.state.blogPost}></CommentList>
        <footer></footer>
      </div>
    )
  }
}

class Post extends React.Component {

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
        <p>{this.props.blogPost.createDate}</p>
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleModify}>Modify</button>
      </div>
    )
  }
}


class CommentList extends React.Component {
	render() {
	  let comments = '';
	  if(this.props.blogPost.comments !== undefined) {
      comments = this.props.blogPost.comments.map(comment =>
        <Comment comment={comment}/>
		  );
	  }
		return (
      <div>
				{comments}
      </div>
		)
	}
}

class Comment extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div className="comment" >
        <p className="content" >{this.props.comment.content}</p>
        <p className="author" >- {this.props.comment.author}</p>
      </div>
		)
	}
}

export default BlogPost;