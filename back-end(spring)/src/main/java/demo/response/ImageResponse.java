package demo.response;


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

