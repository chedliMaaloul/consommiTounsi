package demo.services;

import demo.entities.Produit_Update_Request;
import demo.repository.Produit_Update_Request_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class Produit_Update_Request_Implement  implements Produit_Update_Request_Interface{

    @Autowired
    public Produit_Update_Request_Repository produit_update_request_repository;

    @Override
    public void add_request(Produit_Update_Request produit_update_request) {
        this.produit_update_request_repository.save(produit_update_request);
    }

    @Override
    public List<Produit_Update_Request> get_all_requests() {
        return this.produit_update_request_repository.findAll();
    }

    @Override
    public List<Produit_Update_Request> get_requests() {
        return this.produit_update_request_repository.get_requests();
    }

    @Override
    public Produit_Update_Request get_request(Long id) {
        return this.produit_update_request_repository.get_request(id);
    }

    @Override
    public void update_request(Produit_Update_Request produit_update_request) {
        this.produit_update_request_repository.saveAndFlush(produit_update_request);

    }
}
