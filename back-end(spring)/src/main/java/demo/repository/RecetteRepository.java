package demo.repository;

import demo.entities.Produit;
import demo.entities.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecetteRepository extends JpaRepository<Recette,Integer> {

    @Query("select r.produits from Recette r where r.id  =:id")
    public List<Produit> chercher_produit_recette(@Param("id")Integer id);
}
