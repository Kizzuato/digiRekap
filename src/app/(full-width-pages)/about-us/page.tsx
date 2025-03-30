import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@/icons";

const teamMembers = [
  { 
    name: "Alice Johnson", 
    role: "CEO", 
    message: "lorem ipsum dolor sit amet",
    github: "https://github.com/alicejohnson",
    instagram: "https://instagram.com/alicejohnson",
    whatsapp: "https://wa.me/1234567890"
  },
  { 
    name: "Bob Smith", 
    role: "CTO", 
    message: "lorem ipsum dolor sit amet",
    github: "https://github.com/bobsmith",
    instagram: "https://instagram.com/bobsmith",
    whatsapp: "https://wa.me/1234567891"
  },
  { 
    name: "Charlie Davis", 
    role: "Lead Developer", 
    message: "lorem ipsum dolor sit amet",
    github: "https://github.com/charliedavis",
    instagram: "https://instagram.com/charliedavis",
    whatsapp: "https://wa.me/1234567892"
  },
  { 
    name: "Diana Lee", 
    role: "UI/UX Designer", 
    message: "lorem ipsum dolor sit amet",
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
                          width={44}
                          height={44}
                          src="/images/user/owner.jpg"
                          alt="User"
                          className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-500"
                        />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{member.message}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">GitHub</a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">Instagram</a>
                <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
