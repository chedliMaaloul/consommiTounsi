package demo.repository;

import demo.entities.NoteProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;


@Repository
public interface NoteProduitRepository extends JpaRepository<NoteProduit,Long> {

    @Query(value = "select sum(np.note)/count(*) from note_produit np where np.produit  =:code",nativeQuery = true)
    public double get_produit_note (@Param("code")String id);
}
