package demo.controller;

import demo.entities.Produit;
import demo.entities.Recette;
import demo.services.RecetteServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

/**
 * Created by chedliM on 09/03/2020.
 */
@RestController
@RequestMapping("api/recette")

public class RecetteController {
    @Autowired
    RecetteServiceInterface recetteServiceInterface;
    @PostMapping(value = "/addrecette")
    public void addrecette(@RequestBody Recette recette)
    {
        this.recetteServiceInterface.addrecette(recette);
    }
    @GetMapping(value = "/findallrecettes")
    public List<Recette> listrecette()
    {
        return this.recetteServiceInterface.listrecette();
    }

    @GetMapping(value = "/find_all_produits_recette/{id}")
    public List<Produit> list_produit_by_recette(@PathVariable Integer id)
    {
        return this.recetteServiceInterface.listproduit_by_recette(id);
    }


    @PutMapping(value = "/updaterecette/{id}")
    public void updaterecette(@RequestBody Recette recette, @PathVariable Integer id )
    {
        recette.setId(id);
        this.recetteServiceInterface.update_recette(recette);
    }

    @GetMapping(value = "/find_recette_by_id/{id}")
    public Recette findrecetteById(@PathVariable Integer id)
    {
        return this.recetteServiceInterface.find_recette_by_id(id);
    }
}
