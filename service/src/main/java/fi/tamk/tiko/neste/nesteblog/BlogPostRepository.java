package fi.tamk.tiko.neste.nesteblog;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Helper interface for managing database by extending JpaRepository.
 *
 * @author penjami
 * @version 1.0
 * @since 1.0
 */
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
}
