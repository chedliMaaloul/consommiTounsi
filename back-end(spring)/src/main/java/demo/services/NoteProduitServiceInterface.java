package demo.services;

import demo.entities.NoteProduit;

import java.math.BigDecimal;


public interface NoteProduitServiceInterface {
    public void addnote(NoteProduit noteProduit);
    public double get_produit_note (String code);


}
