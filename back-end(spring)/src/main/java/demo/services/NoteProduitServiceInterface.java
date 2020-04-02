package demo.services;

import demo.entities.NoteProduit;

import java.math.BigDecimal;

/**
 * Created by chedliM on 19/03/2020.
 */
public interface NoteProduitServiceInterface {
    public void addnote(NoteProduit noteProduit);
    public double get_produit_note (String code);


}
