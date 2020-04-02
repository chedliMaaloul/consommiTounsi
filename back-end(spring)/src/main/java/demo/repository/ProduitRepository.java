package demo.repository;
import demo.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by chedliM on 21/02/2020.
 */
@Repository
public interface ProduitRepository extends JpaRepository<Produit,String> {

}
