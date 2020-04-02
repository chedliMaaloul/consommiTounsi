package demo.services;

import demo.entities.Categories;
import demo.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by chedliM on 27/02/2020.
 */
@Service
public class CategoriesServiceImplement implements CategoriesServiceInterface {
    @Autowired
    private CategoriesRepository categoriesRepository;
    @Override
    public void addcategorie(Categories cat) {
        this.categoriesRepository.save(cat);

    }

    @Override
    public List<Categories> listcategorie() {
        return this.categoriesRepository.findAll();
    }

    @Override
    public void updateCategorie(Categories categorie) {
         this.categoriesRepository.saveAndFlush(categorie);
    }

    @Override
    public void deleteCategorie(Integer id) {
        this.categoriesRepository.deleteById(id);
    }
}
