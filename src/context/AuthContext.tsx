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
    id: 13676,
    name: "fußzentrum augsburg orthopädie-schuhtechnik",
    street: "Katharinengasse 24",
    zip: 86150,
    city: "Augsburg",
    contactPerson: "Kai Fessl",
    email: "rechnungen@fusszentrum-augsburg.de",
    password: "yQxGg4LH0TOh",
  },
  {
    id: 12111,
    name: "Orthopädie-Schuhtechnik Burkholz",
    street: "Badtorstr. 16",
    zip: 71711,
    city: "Steinheim an der Murr",
    contactPerson: "Markus Burkholz",
    email: "post@burkholz-orthopaedie.de",
    password: "FxfiezS8B7gN",
  },
  {
    id: 11562,
    name: "Basler Orthopädie René Ruepp AG",
    street: "Austr. 109",
    zip: 4051,
    city: "Basel",
    contactPerson: "Florence Ruepp",
    email: "info@rene-ruepp.ch",
    password: "XA4HhSaPJ2jQ",
  },
  {
    id: 12787,
    name: "Bernwieser Gmbh",
    street: "Thierschstr. 22",
    zip: 80538,
    city: "München",
    contactPerson: "Sebastian Strasser",
    email: "info@bernwieser.de",
    password: "PxBlPuysrrVP",
  },
  {
    id: 20496,
    name: "Ortoconsult & Solution",
    street: "Ganghoferstrasse 14",
    zip: 83342,
    city: "Tacherting",
    contactPerson: "Paul Koliweszka",
    email: "ortoconsult.solution@gmail.com",
    password: "xiTdKAvzO6Gy",
  },
  {
    id: 16539,
    name: "Daniel Wirz Orthopädie Schuh Technik",
    street: "Stumpfgasse 23",
    zip: 53902,
    city: "Bad Münstereifel",
    contactPerson: "Daniel Wirz",
    email: "info@wirz-orthopaedie.de",
    password: "eW9Jhay22yoo",
  },
  {
    id: 17399,
    name: "Schuhe Orthopädie Walter ",
    street: "Hauptstr. 26",
    zip: 3372,
    city: "BLINDENMARKT",
    contactPerson: "Benjamin Walter",
    email: "office@schuhe-walter.at",
    password: "Hre9TB2GzcAX",
  },
  {
    id: 15320,
    name: "Orthopädie-Schuhtechnik",
    street: "Hauptstr. 44",
    zip: 58313,
    city: "Herdecke",
    contactPerson: "Michael Lippmann",
    email: "ortho-lippmann@t-online.de",
    password: "c8uJtx6VpVHJ",
  },
  {
    id: 12342,
    name: "Rehaland Orthopädietechnik GmbH",
    street: "Nicolaistr. 24/26",
    zip: 1307,
    city: "Dresden",
    contactPerson: "Herr Preuß",
    email: "einkauf@rehaland.com",
    password: "RIddiLouvkiX",
  },
  {
    id: 10434,
    name: "Efinger OST",
    street: "Brettreichstr. 11",
    zip: 97074,
    city: "Würzburg",
    contactPerson: "Udo Konrad",
    email: "u.konrad@efinger-ot.de",
    password: "y5y2141AaDJE",
  },
  {
    id: 20469,
    name: "Schuhwerk Neuss GbR",
    street: "Adolf-Flecken-Str. 7",
    zip: 41460,
    city: "Neuss",
    contactPerson: "Elisabeth Teneyken-Bertges",
    email: "info@schuhwerk-neuss.de",
    password: "eoQ4tUo7Nuux",
  },
  {
    id: 12400,
    name: "OST Jakob",
    street: "Neustadt 37",
    zip: 37154,
    city: "Northeim",
    contactPerson: "Stephan Jakob",
    email: "osm.s.jakob@t-online.de",
    password: "MSunEUaoFC5a",
  },
  {
    id: 11376,
    name: "Sanitätshaus OWB oHg",
    street: "Klosterstr. 8",
    zip: 13581,
    city: "Berlin",
    contactPerson: "Christian Alexandrow",
    email: "ot@sanitaetshaus-owb.de",
    password: "zBinEjbAFN88",
  },
  {
    id: 19660,
    name: "Perpedes GmbH",
    street: "Tannenbergstr. 139",
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
