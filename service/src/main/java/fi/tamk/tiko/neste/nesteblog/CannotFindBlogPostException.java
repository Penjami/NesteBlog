package fi.tamk.tiko.neste.nesteblog;

/**
 * Simple exception class to warn about BlogPosts.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
public class CannotFindBlogPostException extends RuntimeException {
    /**
     * ID of the BlogPost.
     */
    private long blogPostID;

    /**
     * @param customerID Saves this ID to the class variable.
     */
    public CannotFindBlogPostException(Long customerID) {
        this.blogPostID = customerID;
    }

    /**
     * @return BlogPostID saved in this class.
     */
    public long getCustomerId() {
        return blogPostID;
    }
}
