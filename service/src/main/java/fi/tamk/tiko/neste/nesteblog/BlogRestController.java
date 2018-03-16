package fi.tamk.tiko.neste.nesteblog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Optional;

@RestController
public class BlogRestController {

    @Autowired
    BlogPostRepository blogPostRepository;

    @PostConstruct
    public void init() {
    }

    @RequestMapping(value = "/blogposts", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }

    @RequestMapping(value = "/blogposts/{blogPostID}", method = RequestMethod.GET)
    public Optional<BlogPost> getBlogPost(@PathVariable long blogPostID) {
        return blogPostRepository.findById(blogPostID);
    }

    @RequestMapping(value = "/blogposts/{blogPostID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogPostID) {
        blogPostRepository.deleteById(blogPostID);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/blogposts", method = RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blogPost) {
        blogPostRepository.save(blogPost);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }


}
