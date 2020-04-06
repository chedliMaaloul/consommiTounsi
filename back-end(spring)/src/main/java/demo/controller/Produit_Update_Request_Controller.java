package demo.controller;

import demo.entities.Produit_Update_Request;
import demo.services.Produit_Update_Request_Interface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by chedliM on 03/04/2020.
 */
@RestController
@RequestMapping("api/produit_request")
public class Produit_Update_Request_Controller {

    @Autowired
    public Produit_Update_Request_Interface produit_update_request_interface;


    @PostMapping(value = "/add_request")
    public void add_request(@RequestBody Produit_Update_Request produit_update_request)
    {
        this.produit_update_request_interface.add_request(produit_update_request);
    }

    @GetMapping(value = "/get_all_requests")
    public List<Produit_Update_Request> get_all_requests()
    {
        return this.produit_update_request_interface.get_all_requests();
    }

    @GetMapping(value = "/get_requests")
    public List<Produit_Update_Request> get_requests()
    {
        return this.produit_update_request_interface.get_requests();
    }
    @GetMapping(value = "/get_request/{id}")
    public Produit_Update_Request get_request(@PathVariable Long id)
    {
        return this.produit_update_request_interface.get_request(id);
    }

    @PutMapping(value = "/update_request")
    public void updaterecette(@RequestBody Produit_Update_Request produit_update_request )
    {
        this.produit_update_request_interface.update_request(produit_update_request);
    }
}

