package demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.nashorn.internal.objects.annotations.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by chedliM on 09/03/2020.
 */

@Entity
public class Recette implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String nom;
    @Lob
    private byte[] img;
    @Lob
    @Column(name="description", length=512)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Produit> produits;

    public Recette() {
    }

    public Recette(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    public Recette(String nom, byte[] img, String description, List<Produit> produits) {
        this.nom = nom;
        this.img = img;
        this.description = description;
        this.produits = produits;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }
}
