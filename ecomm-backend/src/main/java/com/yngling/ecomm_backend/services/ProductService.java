package com.yngling.ecomm_backend.services;

import com.yngling.ecomm_backend.model.Product;
import com.yngling.ecomm_backend.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    //Service to get all products
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    //Service to get products by category
    public List<Product> getProductsByCategory(String category) {
        List<Product> products = productRepo.findByCategory(category);
        logger.info("Fetching products for category: {}, Found {}", category, products.size());
        return products;
    }

    public Product getProductById(int id) {
        return productRepo.findById(id).orElse(null);
    }


    //Service to add a new Product
    public Product addProduct(Product product, MultipartFile imageFile) {
        try{
            if (imageFile != null && !imageFile.isEmpty()) {
                product.setImageData(imageFile.getBytes());
                product.setImageName(imageFile.getOriginalFilename());
                product.setImageType(imageFile.getContentType());
            }
        } catch (IOException e){
            System.out.println("Error adding Image");
        }
        return productRepo.save(product);
    }
}
