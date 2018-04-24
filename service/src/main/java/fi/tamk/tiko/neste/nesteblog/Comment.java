package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.Embeddable;

/**
 * This class contains all the information of the comments. They are embedded in the BlogPost class.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@Embeddable
public class Comment {

    /**
     * Creator of the comment.
     */
    private String author;

    /**
     * Content of the comment.
     */
    private String content;

    /**
     * Default class constructor.
     */
    public Comment() {

    }

    /**
     * Constructor which gets the author and content.
     *
     * @param author Creator of the comment.
     * @param content Content of the comment.
     */
    public Comment(String author, String content) {
        this.author = author;
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
