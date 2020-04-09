package demo.entities;

import javax.persistence.*;
import java.io.Serializable;


@Entity
public class NoteProduit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Integer note;
    @ManyToOne
    @JoinColumn(name = "produit")
    private Produit produit;

    public NoteProduit() {
    }

    public NoteProduit(Integer note, Produit produit) {
        this.note = note;
        this.produit = produit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }
}
