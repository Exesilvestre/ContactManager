"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return (
    <div>
      <h1>Redireccionando a la página de inicio de sesión...</h1>
    </div>
  );
};

export default HomePage;
