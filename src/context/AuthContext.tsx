import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/hooks/useUser";

const mockUsers = [
  {
    id: 19660,
    name: "Bosko Joka",
    street: "Tannenbergstr 139",
    zip: 73230,
    city: "Kirchheim",
    contactPerson: "Bosko Jokanovic",
    email: "edv@perpedes.de",
    password: "Insole!2020",
  },
  {
    id: 11354,
    name: "Orthopädie-Schuhtechnik Steinbrink",
    street: "Roggenmarkt 26",
    zip: 59368,
    city: "Werne",
    contactPerson: "Arne Steinbrink",
    email: "info@schuhtechnik-steinbrink.de",
    password: "test1234",
  },
  {
    id: 11078,
    name: "Orthopädieschuhmeisterei Tilman Ste",
    street: "Blumenstr. 5",
    zip: 85244,
    city: "Röhrmoos",
    contactPerson: "Tilman Steger",
    email: "info@orthopaedieschuhmeisterei.de",
    password: "test1234",
  },
  {
    id: 14007,
    name: "Sanitätshaus Weigel KG",
    street: "Breiter Weg 1",
    zip: 31787,
    city: "Hameln",
    contactPerson: "Doris Sydow",
    email: "info@sanitaetshaus-weigel.de",
    password: "test1234",
  },
  {
    id: 13562,
    name: "Petry Orthopädie-Schuhtechnik",
    street: "Schloßstr. 26",
    zip: 67292,
    city: "Kirchheimbolanden",
    contactPerson: "Thomas Petry",
    email: "info@petry-schuh-service.de",
    password: "test1234",
  },
  {
    id: 12820,
    name: "Ralf Berrischen Orthopädie-Schuhtechnik",
    street: "Geldener Str. 11",
    zip: 47647,
    city: "Kerken",
    contactPerson: "Ralf Berrischen",
    email: "info@berrischen.de",
    password: "test1234",
  },
  {
    id: 14970,
    name: "Fuss-Zentrum-Demmer",
    street: "Frauentorgasse 10",
    zip: 3430,
    city: "Tulln",
    contactPerson: "Eva Demmer",
    email: "office@fusszentrum-demmer.at",
    password: "test1234",
  },
  {
    id: 12603,
    name: "Borghoff Schuhhaus",
    street: "Sauerlandstr. 87",
    zip: 34431,
    city: "Marsberg",
    contactPerson: "Philipp Dülme",
    email: "duelme@borghoff-bredelar.de",
    password: "test1234",
  },
];

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));

      const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
