package fi.tamk.tiko.neste.nesteblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

/**
 * Starts the service.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@SpringBootApplication
public class NesteblogApplication {

    /**
     * Starts the service.
     *
     * @param args Possible command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(NesteblogApplication.class, args);
        System.out.println("Get all: curl http://localhost:8080/api/blogposts");
        System.out.println("Get one: curl http://localhost:8080/api/blogposts/1");
        System.out.println("Delete one: curl -v -X DELETE http://localhost:8080/api/blogposts/1");
        System.out.println("add one: curl -v -d \"{\"author\":\"test author\",\"content\":\"test content\"," +
                "\"title\":\"test title\",\"likes\":0,\"comments\":[]}\" -H \"Content-type:application/json\"" +
                "  http://localhost:8080/api/blogposts");
        System.out.println("modify one: curl -v -d \"{\"author\":\"test author\",\"content\":\"test content\"," +
                "\"title\":\"test title\",\"likes\":0,\"comments\":[]}\" -H \"Content-type:application/json\"" +
                "  http://localhost:8080/api/blogposts/1");
    }

    /**
     * Controls what is the main page.
     *
     * @return The main page.
     */
    @Bean
    public ClassLoaderTemplateResolver reactAppTemplateResolver() {
        ClassLoaderTemplateResolver reactAppTemplateResolver = new ClassLoaderTemplateResolver();
        reactAppTemplateResolver.setPrefix("/static/app/build/");
        reactAppTemplateResolver.setSuffix(".html");
        reactAppTemplateResolver.setTemplateMode(TemplateMode.HTML);
        reactAppTemplateResolver.setCharacterEncoding("UTF-8");
        reactAppTemplateResolver.setOrder(0);
        reactAppTemplateResolver.setCheckExistence(true);

        return reactAppTemplateResolver;
    }
}
