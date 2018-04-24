package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


/**
 * Has all the information that the blogpost needs.
 */
@Entity
@Table(name = "blogposts")
public class BlogPost {
    @Id
    @GeneratedValue
    private long id;
    private String author;
    private String title;

    @Lob
    @Column(length = 50000)
    private String content;
    private LocalDate createDate;
    private LocalDate updateDate;
    @ElementCollection
    private List<Comment> comments = new ArrayList<>();
    private int likes;

    public BlogPost() {}

    /**
     *
     * @param author
     * @param content
     * @param title
     */
    public BlogPost(String author, String content, String title) {
        this.author = author;
        this.content = content;
        this.title = title;
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

    /**
     * Set the Create date and Update date, when the blogpost has been created.
     */
    @PrePersist
    protected void onCreate() {
        setCreateDate(LocalDate.now());
        setUpdateDate(LocalDate.now());
    }

    /**
     * Set the update date, when the blogpost has been updated.
     */
    @PreUpdate
    protected void onUpdate() {
        setUpdateDate(LocalDate.now());
    }

}
