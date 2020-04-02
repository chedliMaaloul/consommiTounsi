package demo.repository;

import demo.entities.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by chedliM on 27/02/2020.
 */
public interface CategoriesRepository extends JpaRepository<Categories,Integer> {
}
