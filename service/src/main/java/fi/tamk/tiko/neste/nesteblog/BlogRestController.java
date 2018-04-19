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

    private String temp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat orci auctor " +
            "mauris ornare, sit amet aliquam turpis semper. Vestibulum ante ipsum primis in faucibus orci luctus et " +
            "ultrices posuere cubilia Curae; Fusce feugiat arcu eget dictum elementum. Integer ultrices pretium posuere.";

    @PostConstruct
    public void init() {
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));
        addBlogPost(new BlogPost("joe", temp, "jeeee"));

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
