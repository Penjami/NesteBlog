package fi.tamk.tiko.neste.nesteblog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

/**
 * Controller for handling database interactions.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@RestController
public class BlogRestController {

    /**
     * BlogPostRepository is autowired to save an instance of itself in this class.
     */
    @Autowired
    BlogPostRepository blogPostRepository;

    /**
     * Simple lorem ipsum String for testing the application.
     */
    private String temp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat orci auctor " +
            "mauris ornare, sit amet aliquam turpis semper. Vestibulum ante ipsum primis in faucibus orci luctus et " +
            "ultrices posuere cubilia Curae; Fusce feugiat arcu eget dictum elementum. Integer ultrices pretium posuere.";

    /**
     * After starting the service, add some test data to the database.
     */
    @PostConstruct
    public void init() {
        BlogPost post = new BlogPost("Nancy Drake", temp, "Lorem Ipsum");
        post.getComments().add(new Comment("jee", "This site is so good!"));
        addBlogPost(new BlogPost("Lowell Lindsay", temp, "So many projects"));
        addBlogPost(new BlogPost("Andrew Gamble", temp, "Team Liquid is the best!"));
        addBlogPost(new BlogPost("Phillip Stafford", temp, "How long until summer?"));
        addBlogPost(new BlogPost("Victor McCarthy", temp, "I wish I had beer..."));
        addBlogPost(new BlogPost("Mike Guy", temp, "This is a clickbait."));
        addBlogPost(new BlogPost("Jose Hansen", temp, "What is this site about?"));
        addBlogPost(new BlogPost("Dale Stafford", temp, "I'm having a déjà vu about these blogposts."));
        addBlogPost(new BlogPost("Joshua Good", temp, "Is HTML a programming language?"));
        addBlogPost(post);
    }

    /**
     * @return All blogposts from the database.
     */
    @RequestMapping(value = "/api/blogposts", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }

    /**
     * @param blogPostID ID of the wanted BlogPost.
     * @return BlogPost with the given ID if found.
     */
    @RequestMapping(value = "/api/blogposts/{blogPostID}", method = RequestMethod.GET)
    public BlogPost getBlogPost(@PathVariable long blogPostID) {
        return blogPostRepository.findById(blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
    }

    /**
     * @param blogPostID ID of the to be deleted BlogPost.
     * @return Response according to what happened during deleting.
     */
    @RequestMapping(value = "/api/blogposts/{blogPostID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogPostID) {
        BlogPost post = blogPostRepository.findById
                (blogPostID).orElseThrow(() -> new CannotFindBlogPostException(blogPostID));
        blogPostRepository.delete(post);
        return ResponseEntity.ok().build();
    }

    /**
     * @param blogPostID ID of the BlogPost to be updated.
     * @param blogPostDetails Details of the BlogPost.
     * @return Updated version of the BlogPost.
     */
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

    /**
     * @param blogPost BlogPost to be saved.
     * @return Response according to what happened during the saving of the BlogPost.
     */
    @PostMapping(value = "/api/blogposts/")
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blogPost) {
        blogPostRepository.save(blogPost);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
