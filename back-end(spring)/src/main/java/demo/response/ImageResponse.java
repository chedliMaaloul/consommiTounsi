package demo.response;

/**
 * Created by chedliM on 23/02/2020.
 */
public class ImageResponse {



    private byte[] picByte;

    public ImageResponse(byte[] photo) {
        this.picByte=photo;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }



}

