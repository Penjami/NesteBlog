import React from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./NavBar";


export class BlogPost extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
	  this.onModify = this.onModify.bind(this);
	  this.deleteBlogPost = this.deleteBlogPost.bind(this);
	  this.commentPost = this.commentPost.bind(this);
	  this.likePost = this.likePost.bind(this);
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
    	this.setState({blogPost: response});
    });
  }

  commentPost(blogPost) {
    fetch('/api/blogposts/'+blogPost.id, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        author: blogPost.author,
        content: blogPost.content,
        title: blogPost.title,
        comments: blogPost.comments
      })}).then(()=> {
      this.forceUpdate();
    });
  }

	likePost(blogPost) {
		fetch('/api/blogposts/'+blogPost.id, {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				author: blogPost.author,
				content: blogPost.content,
				title: blogPost.title,
				likes: blogPost.likes
			})}).then(()=> {
			this.forceUpdate();
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
        <Post blogPost={this.state.blogPost} onLike={this.likePost} onDelete={this.onDelete} onModify={this.onModify} commentPost={this.commentPost}/>
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
    this.handleComment = this.handleComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.state = {comment: ''};
  }

  handleDelete() {
    this.props.onDelete(this.props.blogPost);
  }

  handleModify() {
    this.props.onModify(this.props.blogPost);
  }

	handleLike() {
		this.props.blogPost.likes += 1;
		this.forceUpdate();
		this.props.onLike(this.props.blogPost);
	}

  handleComment(e) {
    e.preventDefault();
    if(this.state.comment !== '') {
    	let tempAuthor = this.state.author;
    	if(tempAuthor === "") {
    		tempAuthor = 'Anonymous';
	    }
      this.props.blogPost.comments.push({author: tempAuthor, content: this.state.comment});
      this.props.commentPost(this.props.blogPost);
      this.setState({comment: '', author: ''});
    } else {
      console.log("Can't post empty comment");
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="blogPost" >
        <h2 className="title" >{this.props.blogPost.title}</h2>
        <p className="content" >{this.props.blogPost.content}</p>
        <p className="author" >- {this.props.blogPost.author} {this.props.blogPost.createDate}</p>
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleModify}>Modify</button>
	      <div className="like"> <p>{this.props.blogPost.likes}</p> <button onClick={this.handleLike}>Like</button></div>
        <h4>Add Comment</h4>
        <form onSubmit={this.handleComment}>
	        <p>name:</p>
	        <input name='author' value={this.state.author} onChange={e => this.handleChange(e)}/>
	        <p>comment:</p>
          <textarea className="commentTextArea" rows="4" name='comment' value={this.state.comment} onChange={e => this.handleChange(e)}/>
          <button className="submitButton" type='Submit'>Comment</button>
        </form>
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