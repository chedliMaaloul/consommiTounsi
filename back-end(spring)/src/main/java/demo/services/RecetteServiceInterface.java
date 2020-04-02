package demo.services;

import com.sun.org.apache.regexp.internal.RE;
import demo.entities.Produit;
import demo.entities.Recette;

import java.util.List;

/**
 * Created by chedliM on 09/03/2020.
 */
public interface RecetteServiceInterface {

    public void addrecette(Recette recette);
    public List<Recette> listrecette();
    public List<Produit> listproduit_by_recette(Integer id);
    public void update_recette (Recette recette);
    public Recette find_recette_by_id (Integer id);
}
