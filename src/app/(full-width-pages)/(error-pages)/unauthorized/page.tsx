import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-center p-6">
      <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
        ERROR
      </h1>

      <Image
        src="/images/error/404.svg"
        alt="404"
        className="dark:hidden"
        width={472}
        height={152}
      />
      {/* <Image
        src="/images/error/403-dark.svg"
        alt="403"
        className="hidden dark:block"
        width={472}
        height={152}
      /> */}

      <h1 className="font-bold text-blue-500 text-9xl">403</h1>
      <h1 className="text-2xl font-bold m-4">Akses Ditolak</h1>
      <p className="mb-6">Maaf, Anda belum login. Silakan login terlebih dahulu.</p>
      <a
        href="/signin"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login Sekarang
      </a>
    </div>
  );
}
