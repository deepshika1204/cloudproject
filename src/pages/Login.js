import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="mb-10">
        <Image
          src="https://links.papareact.com/9xl"
          alt="Spotify Logo"
          width={200}
          height={200}
        />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl font-bold mb-4">
          Millions of songs. Free on Spotify.
        </h1>
        <p className="text-gray-400 text-xl">
          Listen to millions of songs and podcasts for free.
        </p>
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#1DB954] text-white p-5 rounded-full font-bold text-lg hover:bg-[#1ed760] transition duration-300 ease-in-out"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Log in with {provider.name}
          </button>
        </div>
      ))}
      <footer className="mt-20 text-gray-400 text-sm">
        <p>© 2023 Spotify Clone</p>
      </footer>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
