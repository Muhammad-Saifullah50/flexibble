"use client";
import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";

// defining a type for the provider (google, github, facebook etc)
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null; // this is a type that represents an object with string keys and string values.
};

type Providers = Record<string, Provider>; // sring key and Provider value

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);// initially null

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      console.log(response);

    };
    fetchProviders();
  }, []);

  if (providers) { // if any providers
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button key={i} onClick={(() => signIn(provider?.id))}>{provider.id}</button>
          // signin function from nextauth
        ))}
      </div>
    );
  }
};

export default AuthProviders;
