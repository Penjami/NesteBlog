package fi.tamk.tiko.neste.nesteblog;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * This class is used to map the frontend of the application.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
@Controller
public class MainController {

    /**
     * @return Index page.
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}