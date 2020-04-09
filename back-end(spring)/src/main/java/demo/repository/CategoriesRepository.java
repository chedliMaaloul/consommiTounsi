package demo.repository;

import demo.entities.Categories;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoriesRepository extends JpaRepository<Categories,Integer> {
}
