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
        BlogPost post = new BlogPost("Nancy Drake", temp, "jeeee");
        post.getComments().add(new Comment("jee", "jeeeee"));
        addBlogPost(new BlogPost("Lowell Lindsay", temp, "jeeee"));
        addBlogPost(new BlogPost("Andrew Gamble", temp, "jeeee"));
        addBlogPost(new BlogPost("Phillip Stafford", temp, "jeeee"));
        addBlogPost(new BlogPost("Victor McCarthy", temp, "jeeee"));
        addBlogPost(new BlogPost("Mike Guy", temp, "jeeee"));
        addBlogPost(new BlogPost("Jose Hansen", temp, "jeeee"));
        addBlogPost(new BlogPost("Dale Stafford", temp, "jeeee"));
        addBlogPost(new BlogPost("Joshua Good", temp, "jeeee"));
        addBlogPost(new BlogPost("Dylan O'Connor", temp, "jeeee"));
        addBlogPost(new BlogPost("Shane Hansen", temp, "jeeee"));
        addBlogPost(post);
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
        newBlogPost.getComments().clear();
        for(int i = 0; i < blogPostDetails.getComments().size(); i++) {
            newBlogPost.getComments().add(blogPostDetails.getComments().get(i));
        }

        return blogPostRepository.save(newBlogPost);
    }

    @PostMapping(value = "/api/blogposts/")
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blogPost) {
        blogPostRepository.save(blogPost);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
