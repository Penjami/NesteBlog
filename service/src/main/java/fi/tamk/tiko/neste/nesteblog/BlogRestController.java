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
        addBlogPost(new BlogPost("joe", "asdasfq2r ", "jeeee"));
        addBlogPost(new BlogPost("joe", "f  2e sd a", "jeeee"));
        addBlogPost(new BlogPost("joe", "24 asd q2e asd", "jeeee"));
        addBlogPost(new BlogPost("joe", "235 asd q ", "jeeee"));
        addBlogPost(new BlogPost("joe", "jejjee", "jeeee"));
        addBlogPost(new BlogPost("joe", "1241", "jeeee"));
        addBlogPost(new BlogPost("joe", "qwe", "jeeee"));
        addBlogPost(new BlogPost("joe", "saf", "jeeee"));
        addBlogPost(new BlogPost("joe", "cxaw", "jeeee"));
        addBlogPost(new BlogPost("joe", "jejjee", "jeeee"));

    }

    @RequestMapping(value = "/api/blogposts", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }

    @RequestMapping(value = "/api/blogposts/{blogPostID}", method = RequestMethod.GET)
    public BlogPost getBlogPost(@PathVariable long blogPostID) {
        return blogPostRepository.findById(blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
    }

    @RequestMapping(value = "/api/blogposts/{blogPostID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogPostID) {
        BlogPost post = blogPostRepository.findById
                (blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
        blogPostRepository.delete(post);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/blogposts/{id}")
    public BlogPost updateBlogPost(@PathVariable(value = "id") Long blogPostID,
                           @Valid @RequestBody BlogPost blogPostDetails) {

        BlogPost newBlogPost = blogPostRepository.findById(blogPostID)
                .orElseThrow(() -> new CannotFindBlogPostException(blogPostID));

        newBlogPost.setTitle(blogPostDetails.getTitle());
        newBlogPost.setContent(blogPostDetails.getContent());

        return blogPostRepository.save(newBlogPost);
    }

    @PostMapping(value = "/api/blogposts/")
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blogPost) {
        blogPostRepository.save(blogPost);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
