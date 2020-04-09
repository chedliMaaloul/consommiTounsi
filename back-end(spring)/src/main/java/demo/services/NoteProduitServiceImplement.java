package demo.services;

import demo.entities.NoteProduit;
import demo.repository.NoteProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;


@Service
public class NoteProduitServiceImplement implements NoteProduitServiceInterface {
    @Autowired
    private NoteProduitRepository noteProduitRepository;

    @Override
    public void addnote(NoteProduit noteProduit) {
        this.noteProduitRepository.save(noteProduit);

    }

    @Override
    public double get_produit_note(String code) {
        return noteProduitRepository.get_produit_note(code);
    }
}
