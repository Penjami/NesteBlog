package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Blogpost class has all the information about the blogpost.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "blogposts")
public class BlogPost {
    /**
     * Automatically generated id for database organisation.
     */
    @Id
    @GeneratedValue
    private long id;

    /**
     * The creator of the blogpost.
     */
    private String author;

    /**
     * The title of the blogpost.
     */
    private String title;

    /**
     * The content of the blogpost with a maximum length of 50000 characters.
     */
    @Lob
    @Column(length = 50000)
    private String content;

    /**
     * The date the blogpost was created on.
     */
    private LocalDate createDate;

    /**
     * The date the blog post was last updated on.
     */
    private LocalDate updateDate;

    /**
     * A collection of comments from Comment class.
     */
    @ElementCollection
    private List<Comment> comments = new ArrayList<>();

    /**
     * Number of likes the blogpost has.
     */
    private int likes;

    /**
     * Class constructor.
     */
    public BlogPost() {}

    /**
     * Class constructor with parameters.
     *
     * @param author Creator of blogpost.
     * @param content Content of blogpost.
     * @param title Title of blogpost.
     */
    public BlogPost(String author, String content, String title) {
        this.author = author;
        this.content = content;
        this.title = title;
    }

    /**
     * When creating a new blogpost, save today's date on both create and updateDate variables.
     */
    @PrePersist
    protected void onCreate() {
        setCreateDate(LocalDate.now());
        setUpdateDate(LocalDate.now());
    }

    /**
     * On updating the blogpost save today's date to updateDate
     */
    @PreUpdate
    protected void onUpdate() {
        setUpdateDate(LocalDate.now());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
