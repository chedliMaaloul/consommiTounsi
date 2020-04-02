package demo.controller;

import demo.entities.Produit;
import demo.response.ImageResponse;
import demo.services.ProduitServiceInterface;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * Created by chedliM on 21/02/2020.
 */
@RestController
@RequestMapping("api/produit")
public class ProduitController {
    @Autowired
    private ProduitServiceInterface produitservice;


    @PostMapping("/upload")
    public ImageResponse uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);

        byte[] photo=decompressBytes(compressBytes(file.getBytes()));
        return new ImageResponse(photo);
    }

    @PostMapping(value = "/addproduit")
    public void addproduit(@RequestBody Produit prod)
    {
        this.produitservice.addproduit(prod);
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }


    @GetMapping(value = "/findallproduit")
    public List<Produit> listproduit()
    {
        return this.produitservice.listproduit();
    }

    @PutMapping(value = "/updateproduit")
    public void updaterecette(@RequestBody Produit produit )
    {
        this.produitservice.updateproduit(produit);
    }

    @GetMapping(value = "/find_produit_by_id/{code}")
    public Produit findproduitById(@PathVariable String code)
    {
        return this.produitservice.find_produit_by_id(code);
    }

    @DeleteMapping(value = "/deleteproduit/{code}")
    public void delete_produit(@PathVariable String code)
    {
        this.produitservice.deleteproduit(code);
    }
}
