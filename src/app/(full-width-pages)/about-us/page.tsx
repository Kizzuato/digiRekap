import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@/icons";

const teamMembers = [
  { 
    name: "Dzakiyya Puteri Aulia", 
    role: "Web developer", 
    image: "/images/user/jaki.jpg",
    NRP: "152023127",
    github: "https://github.com/alicejohnson",
    instagram: "https://instagram.com/alicejohnson",
    whatsapp: "https://wa.me/1234567890"
  },
  { 
    name: "Deden Roga Nurhidayah", 
    role: "Video Editor", 
    image: "/images/user/oga.jpeg",
    NRP: "152024152",
    github: "https://github.com/bobsmith",
    instagram: "https://instagram.com/bobsmith",
    whatsapp: "https://wa.me/1234567891"
  },
  { 
    name: "Zahratu Thohiroh Sunanto", 
    role: "Sinopsis Writter", 
    image: "/images/user/mira.jpeg",
    NRP: "152024198",
    github: "https://github.com/charliedavis",
    instagram: "https://instagram.com/charliedavis",
    whatsapp: "https://wa.me/1234567892"
  },
  { 
    name: "Syahrina Alma Fitriana", 
    role: "Storyboard Director", 
    image: "/images/user/ama.jpeg",
    NRP: "152024142",
    github: "https://github.com/dianalee",
    instagram: "https://instagram.com/dianalee",
    whatsapp: "https://wa.me/1234567893"
  }
];

export default function AboutUs() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Head>
        <title>About Us - Money Management</title>
        <meta name="description" content="Meet our dedicated team behind Money Management." />
      </Head>

      <header className="flex items-center p-5 shadow-md bg-blue-500 dark:bg-blue-700">
      <Link
          href="/"
          className="inline-flex items-center text-sm text-white transition-colors" >
          <ChevronLeftIcon />
          Kembali ke Halaman Utama
        </Link>
      </header>

      <main className="p-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">Meet Our Team</h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
<Image
  width={96}
  height={96}
  src={member.image}
  alt="User"
  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 border-4 border-blue-500 rounded-full object-cover"
/>

              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{member.NRP}</p>
              {/* <div className="flex justify-center mt-4 space-x-4">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">GitHub</a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">Instagram</a>
                <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">WhatsApp</a>
              </div> */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
