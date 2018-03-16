package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;

@Entity
@Table(name = "blogposts")
public class BlogPost {
    @Id
    @GeneratedValue
    private long id;
    private String author;
    private String content;
    @Column(name="timestamp", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalTime postDate;
    private LocalTime updateDate;
    private ArrayList<String> comments;
    private int likes;

    public BlogPost() {
        comments = new ArrayList<>();
    }

    public BlogPost(String author, String content) {
        comments = new ArrayList<>();
        this.author = author;
        this.content = content;
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

    public LocalTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalTime postDate) {
        this.postDate = postDate;
    }

    public LocalTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalTime updateDate) {
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
        setPostDate(LocalTime.now());
    }

    @PreUpdate
    protected void onUpdate() {
        setUpdateDate(LocalTime.now());
    }

}
