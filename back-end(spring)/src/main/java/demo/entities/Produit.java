package demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
public class Produit implements Serializable {
    @Id
    private String code;
    private String nom;
    private String marque;
    private Integer prix;
    @Lob
    private byte[] img;
    @ManyToOne
    @JoinColumn(name = "categorie")
    private Categories categorie;
    @JsonIgnore
    @ManyToMany(mappedBy = "produits" ,fetch = FetchType.LAZY)
    private List<Recette> recettes;

    public Produit() {
    }

    public Produit(String code, String nom, String marque, Integer prix, byte[] img, Categories categorie, List<Recette> recettes) {
        this.code = code;
        this.nom = nom;
        this.marque = marque;
        this.prix = prix;
        this.img = img;
        this.categorie = categorie;
        this.recettes = recettes;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public Categories getCategorie() {
        return categorie;
    }

    public void setCategorie(Categories categorie) {
        this.categorie = categorie;
    }

    public List<Recette> getRecettes() {
        return recettes;
    }

    public void setRecettes(List<Recette> recettes) {
        this.recettes = recettes;
    }
}
