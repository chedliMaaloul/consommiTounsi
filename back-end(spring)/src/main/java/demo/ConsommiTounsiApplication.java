package demo;

import demo.entities.Categories;
import demo.entities.Produit;
import demo.entities.Recette;
import demo.repository.CategoriesRepository;
import demo.repository.ProduitRepository;
import demo.repository.RecetteRepository;
import demo.services.ProduitServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class ConsommiTounsiApplication implements CommandLineRunner{
	@Autowired
	ProduitRepository produitRepositoryuit;
	@Autowired
	CategoriesRepository categoriesRepository;
	@Autowired
	RecetteRepository recetteRepository;

	public static void main(String[] args) {
		SpringApplication.run(ConsommiTounsiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Categories categories=new Categories();
		categories=this.categoriesRepository.findById(2).get();
		Produit pr = new Produit("6192011803672","Lilas","nett",300,null,categories,null);
		Produit pr2 = new Produit("6192011803670","Lilasss","netttt",300,null,categories,null);
		//this.produitRepositoryuit.save(pr2);
		List<Produit> produitList = new ArrayList<Produit>();
		produitList.addAll(Arrays.asList(pr,pr2));
		Recette recette = new Recette("recette1",null,"azereryioll,bvcc",produitList);
		Recette recette1=new Recette();
		//recette1=this.recetteRepository.findById(1).get();
		recette1.setProduits(produitList);
		//this.recetteRepository.save(recette);
		//this.recetteRepository.saveAndFlush(recette1);

	}
}
