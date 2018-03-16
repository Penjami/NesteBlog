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

    public BlogPost(String author) {
        this.author = author;
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
}
