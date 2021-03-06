package demo.services;

import demo.entities.Produit;

import java.util.List;


public interface ProduitServiceInterface {
    public void addproduit(Produit pr);
    public List<Produit> listproduit();
    public Produit find_produit_by_id (String code);
    public void updateproduit (Produit produit);
    public void deleteproduit (String code);
}
