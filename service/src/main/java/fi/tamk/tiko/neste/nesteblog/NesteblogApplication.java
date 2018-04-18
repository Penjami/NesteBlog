package fi.tamk.tiko.neste.nesteblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@SpringBootApplication
public class NesteblogApplication {

    public static void main(String[] args) {
        SpringApplication.run(NesteblogApplication.class, args);
    }

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
