package demo.controller;

import demo.entities.Categories;
import demo.services.CategoriesServiceImplement;
import demo.services.CategoriesServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/categories")

public class CategoriesController {
    @Autowired
    private CategoriesServiceInterface categoriesServiceInterface;

    @PostMapping(value = "/addcategorie")
    public void addcategorie(@RequestBody Categories categories)
    {
        this.categoriesServiceInterface.addcategorie(categories);
    }

    @GetMapping(value = "/getcategories")
    public List<Categories> get_categories()
    {
        return this.categoriesServiceInterface.listcategorie();
    }

    @PutMapping(value = "/updatecategorie")
    public void update_categories(@RequestBody Categories categorie)
    {
         this.categoriesServiceInterface.updateCategorie(categorie);
    }

    @DeleteMapping(value = "/deletecategorie/{id}")
    public void delete_categories(@PathVariable Integer id)
    {
        this.categoriesServiceInterface.deleteCategorie(id);
    }
}
