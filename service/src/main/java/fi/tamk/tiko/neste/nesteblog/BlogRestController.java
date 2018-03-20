package fi.tamk.tiko.neste.nesteblog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

@RestController
public class BlogRestController {

    @Autowired
    BlogPostRepository blogPostRepository;

    @PostConstruct
    public void init() {
        addBlogPost(new BlogPost("joe", "jejjee", "jeeee"));
    }

    @RequestMapping(value = "/blogposts", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }

    @RequestMapping(value = "/blogposts/{blogPostID}", method = RequestMethod.GET)
    public BlogPost getBlogPost(@PathVariable long blogPostID) {
        return blogPostRepository.findById(blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
    }

    @RequestMapping(value = "/blogposts/{blogPostID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogPostID) {
        BlogPost post = blogPostRepository.findById
                (blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
        blogPostRepository.delete(post);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/blogposts/{id}")
    public BlogPost updateBlogPost(@PathVariable(value = "id") Long blogPostID,
                           @Valid @RequestBody BlogPost blogPostDetails) {

        BlogPost newBlogPost = blogPostRepository.findById(blogPostID)
                .orElseThrow(() -> new CannotFindBlogPostException(blogPostID));

        newBlogPost.setTitle(blogPostDetails.getTitle());
        newBlogPost.setContent(blogPostDetails.getContent());

        return blogPostRepository.save(newBlogPost);
    }

    @RequestMapping(value = "/blogposts", method = RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blogPost) {
        blogPostRepository.save(blogPost);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
