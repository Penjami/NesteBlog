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
