import Image from "next/image";
import Link from "next/link";
import photosConfig from "@/config/photos";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Ráj<span className="text-3xl">ečko</span> z oblaků
          </h1>
          <p className="text-xl text-gray-600">
            Vyberte panoramatickou fotografii, kterou chcete prozkoumat ve 360°
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(photosConfig).map(([key, photo]) => (
            <Link 
              key={key}
              href={`/${key}`}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              prefetch={false}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`/${photo.thumbnail}`}
                  alt={photo.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {photo.caption}
                </h3>
                <p className="text-gray-500 mt-2">
                  Prozkoumat ve 360°
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Zdrojový kód dostupný na <Link href="https://github.com/molenusaczech/panoview">GitHubu</Link></p>
        </div>
      </div>
    </div>
  );
}
