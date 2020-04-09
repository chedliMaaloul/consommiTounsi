package demo.services;


import demo.entities.Categories;

import java.util.List;


public interface CategoriesServiceInterface {

    public void addcategorie(Categories cat);

    public List<Categories> listcategorie();

    public void updateCategorie(Categories categorie);
    public void deleteCategorie(Integer id);

}
