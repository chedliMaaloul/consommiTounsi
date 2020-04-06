package demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by chedliM on 03/04/2020.
 */
@Entity
public class Produit_Update_Request implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
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
    private String date;
    private String champ;
    @Column(columnDefinition = "varchar(255) default 'non lue'")
    private String etat;

    public Produit_Update_Request() {
    }

    public Produit_Update_Request(String code, String nom, String marque, Integer prix, byte[] img, Categories categorie, List<Recette> recettes, String date, String champ, String etat) {
        this.code = code;
        this.nom = nom;
        this.marque = marque;
        this.prix = prix;
        this.img = img;
        this.categorie = categorie;
        this.recettes = recettes;
        this.date = date;
        this.champ = champ;
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getChamp() {
        return champ;
    }

    public void setChamp(String champ) {
        this.champ = champ;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }
}
