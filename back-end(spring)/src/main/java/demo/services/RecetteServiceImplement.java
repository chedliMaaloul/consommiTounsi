package demo.services;

import demo.entities.Produit;
import demo.entities.Recette;
import demo.repository.RecetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by chedliM on 09/03/2020.
 */
@Service
public class RecetteServiceImplement implements RecetteServiceInterface {
    @Autowired
    private RecetteRepository recetteRepository;
    @Override
    public void addrecette(Recette recette) {
        this.recetteRepository.save(recette);
    }

    @Override
    public List<Recette> listrecette() {
        return this.recetteRepository.findAll();
    }

    @Override
    public List<Produit> listproduit_by_recette(Integer id) {
        return this.recetteRepository.chercher_produit_recette(id);
    }

    @Override
    public void update_recette(Recette recette) {
        this.recetteRepository.saveAndFlush(recette);
    }

    @Override
    public Recette find_recette_by_id(Integer id) {
        return this.recetteRepository.findById(id).get();
    }
}
