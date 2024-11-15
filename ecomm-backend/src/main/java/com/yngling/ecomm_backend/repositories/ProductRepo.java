package com.yngling.ecomm_backend.repositories;

import com.yngling.ecomm_backend.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    //Method to get products by category
    List<Product> findByCategory(String category);
}
