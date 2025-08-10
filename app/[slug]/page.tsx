import PanoramaComp from "@/components/panoComponent";
import photosConfig from "@/config/photos";
import Link from "next/link";

export async function generateStaticParams() {
    return Object.keys(photosConfig).map((key) => ({
        slug: key,
    }));   
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
    if (!photosConfig[slug]) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Photo not found</h1>
                    <Link 
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        ← Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen">
            {/* Back button */}
            <div className="absolute top-4 left-4 z-10">
                <Link 
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg hover:bg-white shadow-lg transition-all duration-300"
                >
                    ← Zpět na hlavní stránku
                </Link>
            </div>
            
            <PanoramaComp
                imgSrc={photosConfig[slug].src}
                title={photosConfig[slug].caption}
            />
        </div>
    );

}