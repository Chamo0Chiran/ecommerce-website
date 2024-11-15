package com.yngling.ecomm_backend.controllers;


import com.yngling.ecomm_backend.model.Product;
import com.yngling.ecomm_backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    //Get all the products
    @GetMapping("/products")
    public ResponseEntity< List<Product>>getAllProducts(){
        List<Product> products = service.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    //Get products by Category
    @GetMapping("/products/{category}")
    public ResponseEntity<List<Product>>getProductByCategory(@PathVariable String category){
        List<Product> products = service.getProductsByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    //Add a product
    @PostMapping("/products/add")
    public ResponseEntity<Product> addProduct(@RequestPart("product") Product product,
                                              @RequestPart("imageFile") MultipartFile imageFile){
        Product product1 = service.addProduct(product, imageFile);
        return new ResponseEntity<>(product1, HttpStatus.CREATED);
    }

    @GetMapping("products/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {
        Product product = service.getProductById(productId);
        if (product == null || product.getImageData() == null) {
            return ResponseEntity.notFound().build(); // Handle case where product or image data is not found
        }

        byte[] imageFile = product.getImageData();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImageType()))
                .body(imageFile);
    }

}
