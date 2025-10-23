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
    name: "Perpedes GmbH",
    street: "Tannenbergstr 139",
    zip: 73230,
    city: "Kirchheim",
    contactPerson: "Bosko Jokanovic",
    email: "b.jokanovic@perpedes.de",
    password: "Insole!2020",
  },
  {
    id: 13906,
    name: "Kajamed GmbH",
    street: "Neefestr. 149",
    zip: 9116,
    city: "Chemnitz",
    contactPerson: "Nicole Schwierz",
    email: "info@kajamed.de",
    password: "hXeQWgOOceMs",
  },
  {
    id: 13045,
    name: "Schuh+Sport Molitor GmbH",
    street: "Belmer Str. 34/36",
    zip: 49084,
    city: "Osnabrück",
    contactPerson: "Schuh + Sport Molitor",
    email: "info@molitor-os.de",
    password: "p4cMRiSq3LTp",
  },
  {
    id: 10154,
    name: "Kölsch Orthopädie-Schuh-Technik",
    street: "Dr. Robert- Schelp- Platz 1",
    zip: 66953,
    city: "Pirmasens",
    contactPerson: "Rainer Kölsch",
    email: "info@ortho-koelsch.de",
    password: "QwltOihwdlUb",
  },
  {
    id: 12132,
    name: "Orthopädietechnik Kempa & Beu OHG",
    street: "Dieselstr. 16",
    zip: 71696,
    city: "Möglingen",
    contactPerson: "Chiara",
    email: "info@kempaundbeu.de",
    password: "qFO3SQMuK13y",
  },
  {
    id: 11354,
    name: "Orthopädie & Schuhtechnik Steinbrink GbR",
    street: "Roggenmarkt 26",
    zip: 59368,
    city: "Werne",
    contactPerson: "Arne Steinbrink",
    email: "info@schuhtechnik-steinbrink.de",
    password: "Zanmv1Vw6Gwv",
  },
  {
    id: 11078,
    name: "OrthopädieschuhMeisterei Tilman Steger",
    street: "Blumenstr. 5",
    zip: 85244,
    city: "Röhrmoos",
    contactPerson: "Tilman Steger",
    email: "info@orthopaedieschuhmeisterei.de",
    password: "Nlx7peHfliqu",
  },
  {
    id: 14007,
    name: "Sanitätshaus Weigel GmbH&Co.KG",
    street: "Breiter Weg 1",
    zip: 31787,
    city: "Hameln",
    contactPerson: "Doris Sydow",
    email: "info@sanitaetshaus-weigel.de",
    password: "2uqgJN13YtDB",
  },
  {
    id: 13562,
    name: "Petry Schuh-Service",
    street: "Schloßstr. 26",
    zip: 67292,
    city: "Kirchheimbolanden",
    contactPerson: "Thomas Petry",
    email: "info@petry-schuh-service.de",
    password: "cc2w5IjlbBuh",
  },
  {
    id: 12820,
    name: "Berrischen",
    street: "Geldener Str. 11",
    zip: 47647,
    city: "Kerken",
    contactPerson: "Ralf Berrischen",
    email: "info@berrischen.de",
    password: "zzQJdJJaMZSe",
  },
  {
    id: 14970,
    name: "FUSSZENTRUM-DEMMER",
    street: "Frauentorgasse 10",
    zip: 3430,
    city: "Tulln",
    contactPerson: "Eva Demmer",
    email: "office@fusszentrum-demmer.at",
    password: "7gbpvwenkdoB",
  },
  {
    id: 12603,
    name: "Borghoff Schuhhaus u. Orthopädie GmbH",
    street: "Sauerlandstr. 87",
    zip: 34431,
    city: "Marsberg",
    contactPerson: "Philipp Dülme",
    email: "duelme@borghoff-bredelar.de",
    password: "XTtjzh2irx4A",
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
