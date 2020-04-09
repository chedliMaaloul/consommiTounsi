package demo.services;

import demo.entities.Produit_Update_Request;

import java.util.List;


public interface Produit_Update_Request_Interface {

    public void add_request(Produit_Update_Request produit_update_request);
    public List<Produit_Update_Request> get_all_requests();
    public List<Produit_Update_Request> get_requests();
    public Produit_Update_Request get_request(Long id);
    public void update_request(Produit_Update_Request produit_update_request);



}
