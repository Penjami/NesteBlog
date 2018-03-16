package fi.tamk.tiko.neste.nesteblog;

public class CannotFindBlogPostException extends RuntimeException {
    private long customerId;

    public CannotFindBlogPostException(Long customerID) {
        this.customerId = customerID;
    }

    public long getCustomerId() {
        return customerId;
    }
}
