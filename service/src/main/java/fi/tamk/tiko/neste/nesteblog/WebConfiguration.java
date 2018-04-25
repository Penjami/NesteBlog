package fi.tamk.tiko.neste.nesteblog;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * This class redirects urls to back to the frontend application.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    /**
     * Adds forwards to the View Controller Registry.
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/**/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
    }
}