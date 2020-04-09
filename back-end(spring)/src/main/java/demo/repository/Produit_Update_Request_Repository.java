package demo.repository;

import demo.entities.Produit_Update_Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface Produit_Update_Request_Repository extends JpaRepository<Produit_Update_Request,Long> {

    @Query(value = "select * from Produit_Update_Request r where r.etat  ='en attente'",nativeQuery = true)
    public List<Produit_Update_Request> get_requests();
    @Query(value = "select * from Produit_Update_Request r where r.etat  ='en attente' AND r.id =:id",nativeQuery = true)
    public Produit_Update_Request get_request(@Param("id") Long id);
}
