package demo.controller;

import demo.entities.NoteProduit;
import demo.services.NoteProduitServiceInterface;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * Created by chedliM on 19/03/2020.
 */
@RestController
@RequestMapping("api/note_produit")
public class NoteProduitController {
    @Autowired
    private NoteProduitServiceInterface noteProduitServiceInterface;
    @Autowired
    private static DecimalFormat df2 = new DecimalFormat("#.#");

    @PostMapping(value = "/addnoteProduit")
    public void addnoteProduit(@RequestBody NoteProduit noteProduit)
    {
        this.noteProduitServiceInterface.addnote(noteProduit);
    }

    @GetMapping(value ="/get_produit_note/{code}")
    public double get_produit_note(@PathVariable String code)
    {
        //System.out.println((noteProduitServiceInterface.get_produit_note(code)));
        try {
            double x =noteProduitServiceInterface.get_produit_note(code);
            String ch =df2.format(x);
            ch=ch.replace(',','.');
            double d = new Double(ch).doubleValue();
            return d;
        }catch (Exception e)
        {
            return 0;
        }

    }
}
