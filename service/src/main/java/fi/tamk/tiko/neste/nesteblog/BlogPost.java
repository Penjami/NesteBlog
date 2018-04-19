package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;

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
    private ArrayList<String> comments;
    private int likes;

    public BlogPost() {
        comments = new ArrayList<>();
    }

    public BlogPost(String author, String content, String title) {
        comments = new ArrayList<>();
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

    public ArrayList<String> getComments() {
        return comments;
    }

    public void setComments(ArrayList<String> comments) {
        this.comments = comments;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    @PrePersist
    protected void onCreate() {
        setCreateDate(LocalDate.now());
        setUpdateDate(LocalDate.now());
    }

    @PreUpdate
    protected void onUpdate() {
        setUpdateDate(LocalDate.now());
    }

}
