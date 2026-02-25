import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "dummy_public_key",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy_private_key",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy",
});

export async function GET() {
    try {
        const authParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authParameters);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        return NextResponse.json(
            { error: "Failed to generate authentication parameters." },
            { status: 500 }
        );
    }
}
