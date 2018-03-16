package fi.tamk.tiko.neste.nesteblog;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "blogposts")
public class BlogPost {
    @Id
    @GeneratedValue
    private long id;
    private String author;
    private String content;
    private String postDate;
    private String updateDate;

    public BlogPost() {
    }

    public BlogPost(String author, String content, String postDate, String updateDate) {
        this.author = author;
        this.content = content;
        this.postDate = postDate;
        this.updateDate = updateDate;
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

    public String getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        this.postDate = postDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }
}
