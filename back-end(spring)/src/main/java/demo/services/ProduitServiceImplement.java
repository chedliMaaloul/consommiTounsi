package demo.services;

import demo.entities.Produit;
import demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProduitServiceImplement implements ProduitServiceInterface {
    @Autowired
    private ProduitRepository pr;
    @Override
    public void addproduit(Produit prod) {

        this.pr.save(prod);
    }

    @Override
    public List<Produit> listproduit() {
        return pr.findAll();
    }

    @Override
    public Produit find_produit_by_id(String code) {
        return this.pr.findById(code).get();
    }

    @Override
    public void updateproduit(Produit produit) {
        this.pr.saveAndFlush(produit);

    }

    @Override
    public void deleteproduit(String code) {
        this.pr.deleteById(code);
    }
}
