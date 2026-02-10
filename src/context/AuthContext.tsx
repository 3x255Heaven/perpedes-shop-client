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
    "id": 14470,
    "name": "Orthopädie Schuhtechnik",
    "street": "Burbacher Str. 174",
    "zip": 53129,
    "city": "Bonn",
    "contactPerson": "Stephan Löbbert",
    "email": "OST-Loebbert@t-online.de",
    "password": "SzgoJPPM3YPo"
  },
  {
    "id": 14681,
    "name": "Orthopädie& Reha Bedarf GmbH",
    "street": "Hospitalstr. 44-46",
    "zip": 55232,
    "city": "Alzey",
    "contactPerson": "Philipp Schultheiß",
    "email": "werkstatt@reha-alzey.de",
    "password": "uARa51g27VPJ"
  },
  {
    "id": 14739,
    "name": "Orthopädieschuhtechnik Steffen Werner",
    "street": "Rathausstr. 9",
    "zip": 1900,
    "city": "Großröhrsdorf",
    "contactPerson": "Steffen Werner",
    "email": "info@orthopaedie-werner.de",
    "password": "Hs0X8ZZSpCSL"
  },
  {
    "id": 14433,
    "name": "Schuhservice Michael Lutz",
    "street": "Angelstr. 9",
    "zip": 71665,
    "city": "Vaihingen/Enz",
    "contactPerson": "Michael Lutz",
    "email": "Schuhservice-m.lutz@gmx.de",
    "password": "tQyWXNbk6RkJ"
  },
  {
    "id": 14475,
    "name": "Orthopädie-Schuhtechnik Eskes",
    "street": "Eickener Str. 185",
    "zip": 41063,
    "city": "Mönchengladbach",
    "contactPerson": "Dirk Eskes",
    "email": "Dirk-Eskes@t-online.de",
    "password": "u9BeQwghpgUS"
  },
  {
    "id": 11140,
    "name": "Sanitätshaus Müller GmbH",
    "street": "Ostertorstr. 18",
    "zip": 27283,
    "city": "Verden/Aller",
    "contactPerson": "Peter Franke",
    "email": "werkstatt-ver@sanitaetshausmueller.de",
    "password": "lb0Rr3AR1rjH"
  },
  {
    "id": 15992,
    "name": "Raab Gesunde Schuhe Inh. Matthias Raab",
    "street": "Ravenestr. 35a",
    "zip": 56812,
    "city": "Cochem",
    "contactPerson": "Matthias Raab",
    "email": "info@raab-gesunde-schuhe.de",
    "password": "FVGS1CclfYUu"
  },
  {
    "id": 10444,
    "name": "e&k Sanitätshaus GmbH",
    "street": "Karl-Herbster-Str. 7",
    "zip": 79539,
    "city": "Lörrach",
    "contactPerson": "Jannik Bender",
    "email": "info@ek-sanitaetshaus.de",
    "password": "DibvfpenRmzy"
  },
  {
    "id": 10574,
    "name": "Orthopädie Schuhtechnik Glodek",
    "street": "Lagerhausstr. 4",
    "zip": 82449,
    "city": "Uffing",
    "contactPerson": "Jörg Glodek",
    "email": "info@glodek-marl.de",
    "password": "LpiVwJSJ5q5Q"
  },
  {
    "id": 13795,
    "name": "Sanitätshaus ROSE",
    "street": "Walkmühle 11",
    "zip": 91438,
    "city": "Bad Windsheim",
    "contactPerson": "Andre Allraun",
    "email": "andre.allraun@shrose.de",
    "password": "uZJwiX3XFEzV"
  },
  {
    "id": 12482,
    "name": "OBERLE GmbH & Co. KG",
    "street": "Carl-Schneider-Str. 15",
    "zip": 77955,
    "city": "Ettenheim",
    "contactPerson": "Philipp Oberle",
    "email": "info@ortho-oberle.de",
    "password": "O0aO8rablPft"
  },
  {
    "id": 11127,
    "name": "Mink Orthopädieschuhtechnik GmbH & Co. KG",
    "street": "Gaisburgstr. 3",
    "zip": 70182,
    "city": "Stuttgart",
    "contactPerson": "Marian Mink",
    "email": "service@mink-orthopaedie.de",
    "password": "FM7sHWyT8h6y"
  },
  {
    "id": 13180,
    "name": "Nosthoff GmbH",
    "street": "Uerdinger Str. 109",
    "zip": 47799,
    "city": "Krefeld",
    "contactPerson": "Sven Nosthoff",
    "email": "schuhtechnik.nostrhoff@web.de",
    "password": "VfyUMQwhzt7K"
  },
  {
    "id": 11855,
    "name": "Streb GmbH Orthopädie-Schuhtechnik",
    "street": "Pflegstr. 3-5",
    "zip": 86609,
    "city": "Donauwörth",
    "contactPerson": "Selina Streb",
    "email": "streb_gmbh@t-online.de",
    "password": "cfQxvE4AuHur"
  },
  {
    "id": 10440,
    "name": "Sanitätshaus Erling GmbH&CoKG",
    "street": "In der Kerz 12",
    "zip": 74545,
    "city": "Michelfeld",
    "contactPerson": "Sandra Lenz",
    "email": "erling_sanitaetshaus@t-online.de",
    "password": "MBFPxc2ChTlO"
  },
  {
    "id": 13434,
    "name": "Sanitätshaus Kienzle",
    "street": "Sählingstr. 16",
    "zip": 57319,
    "city": "Bad Berleburg",
    "contactPerson": "Hubert Kienzle",
    "email": "schuhtechnik@sanitaetshaus-kienzle.de",
    "password": "KdZ11qU8bOqa"
  },
  {
    "id": 10048,
    "name": "Sanitätshaus AtO GmbH",
    "street": "Breite Str. 40",
    "zip": 39576,
    "city": "Stendal",
    "contactPerson": "Tom Hase",
    "email": "ato.logistik@ato-stendal.com",
    "password": "GtOoRB1cYVkl"
  },
  {
    "id": 10695,
    "name": "Sanitätshaus Graf GmbH",
    "street": "Bahnhofstr. 12",
    "zip": 6217,
    "city": "Merseburg",
    "contactPerson": "Christian Graf",
    "email": "werkstatt@sanitaetshausgraf.de",
    "password": "U87KQrjCrGrE"
  },
  {
    "id": 17454,
    "name": "Treml Laufgut GmbH",
    "street": "Gewerbestr. 15",
    "zip": 82211,
    "city": "Herrsching",
    "contactPerson": "Bettina Treml",
    "email": "anfrage@treml-laufgut.de",
    "password": "XKMlZweHrxKI"
  },
  {
    "id": 15562,
    "name": "Sanitaetshaus & Orthopädieschuhtechnik Andreas Arnold",
    "street": "Mainburger Str. 15",
    "zip": 85354,
    "city": "Freising",
    "contactPerson": "Andreas Arnold",
    "email": "info@sanitaetshaus-freising.de",
    "password": "RGsEGax862p7"
  },
  {
    "id": 12997,
    "name": "Thomas Penners Orthopädietechnik",
    "street": "Sittarder Str. 28",
    "zip": 52538,
    "city": "Gangelt",
    "contactPerson": "Thomas Penners",
    "email": "info@ortho-penners.de",
    "password": "SfGirE9LbfHt"
  },
  {
    "id": 14143,
    "name": "Orthopädietechnik Hamburg",
    "street": "Rahlstedter Bahnhofstr. 9",
    "zip": 22143,
    "city": "Hamburg",
    "contactPerson": "David Pomarino",
    "email": "sani@ptz-pomarino.de",
    "password": "bLHXqkEAjKKV"
  },
  {
    "id": 17320,
    "name": "Schär Schuhtechnik",
    "street": "Dorfstr. 15",
    "zip": 8967,
    "city": "Widen",
    "contactPerson": "Thomas Schär",
    "email": "info@schaer-schuhtechnik.ch",
    "password": "sTZCQy6k6A1x"
  },
  {
    "id": 11412,
    "name": "SOT Sanitätshaus und Orthopädietechnik Berlin GmbH",
    "street": "Alt-Biesdorf 35",
    "zip": 12683,
    "city": "Berlin",
    "contactPerson": "Katrin Kunze",
    "email": "kontakt@sot-berlin.de",
    "password": "A18Xli35dQIR"
  },
  {
    "id": 560,
    "name": "Atelier OT CRR-SUVA  (Kunden-Nr.000560)",
    "street": "Bildstr. 10",
    "zip": 71254,
    "city": "Ditzingen",
    "contactPerson": "Fabio SIMONA",
    "email": "fabio.simona@crr-suva.ch",
    "password": "kcfIkTRUAXZh"
  },
  {
    "id": 17422,
    "name": "Liebau Orthopädietechnik",
    "street": "Altonaer Chaussee 61",
    "zip": 22869,
    "city": "Schenefeld",
    "contactPerson": "Clas Tibken",
    "email": "kinderot-hh@liebau-ot.de",
    "password": "7OOxk12a4fqt"
  },
  {
    "id": 11652,
    "name": "Siebeneck Orthopädietechnik GmbH",
    "street": "Loerstr. 17a",
    "zip": 48143,
    "city": "Münster",
    "contactPerson": "Malte Siebels ",
    "email": "werkstatt@orthopaedie-siebeneck.de",
    "password": "mkN3e7CnJLw5"
  },
  {
    "id": 10152,
    "name": "Sanitätshaus Brauns",
    "street": "Mühlgasse 4",
    "zip": 35745,
    "city": "Herborn/Dillkr.",
    "contactPerson": "Morten Thielmann",
    "email": "werkstatt@sani-brauns.de",
    "password": "ephGMqGBGwem"
  },
  {
    "id": 14639,
    "name": "nova orthotec",
    "street": "Nuthedamm 19",
    "zip": 14974,
    "city": "Ludwigsfelde",
    "contactPerson": "Carola Fischer",
    "email": "info@orthesen-manufaktur.de",
    "password": "dZUhD2n7Nks0"
  },
  {
    "id": 14878,
    "name": "Eichsfelder Orthopädietechnik, Inh. Katja Schulz",
    "street": "Hausener Weg 69",
    "zip": 37339,
    "city": "Leinefelde-Worbis",
    "contactPerson": "Katja Schulz",
    "email": "info@eichsfelder-ot.de",
    "password": "Tuk8t0qAKDEc"
  },
  {
    "id": 10837,
    "name": "Kajamed GmbH",
    "street": "Am Bahnhof 4",
    "zip": 8056,
    "city": "Zwickau",
    "contactPerson": "Felix Kieschnick",
    "email": "F.Kieschnick@kajamed.de",
    "password": "a5x5cPfwiPpz"
  },
  {
    "id": 1462,
    "name": "Sanitätshaus Laumann e.K.",
    "street": "Rembertistraße 32",
    "zip": 28203,
    "city": "Bremen",
    "contactPerson": "Hendrik Schnadthorst",
    "email": "info@sanitaetshaus-laumann.de",
    "password": "onSsTkMVZlX4"
  },
  {
    "id": 12988,
    "name": "Michael Grashei Orthopädieschuhtechnik",
    "street": "Griesstr. 2",
    "zip": 86368,
    "city": "Gersthofen",
    "contactPerson": "Alexandra Grashei",
    "email": "alexandra@grashei.de",
    "password": "KAAULp8V1WRm"
  },
  {
    "id": 11282,
    "name": "Kramp Fußorthopädie GmbH",
    "street": "Kelkelstr. 28",
    "zip": 66763,
    "city": "Dillingen",
    "contactPerson": "Michael Kramp",
    "email": "info@kramp-gutzufuss.de",
    "password": "edkprmVmDOAt"
  },
  {
    "id": 14627,
    "name": "Orthopädie-Schuhtechnik Lorenz",
    "street": "Am Maubishof 1",
    "zip": 41564,
    "city": "Kaarst",
    "contactPerson": "Michael Lorenz",
    "email": "schuhtechnik-lorenz@t-online.de",
    "password": "XMEysKXBK7sK"
  },
  {
    "id": 14862,
    "name": "Sanitätshaus Laumann e.K.",
    "street": "Frankfurter Str. 10",
    "zip": 65830,
    "city": "Kriftel",
    "contactPerson": "Hendrik Schnadthorst",
    "email": "h.schnadthorst@sanitaetshaus-laumann.de",
    "password": "MEl8vpjQsCnG"
  },
  {
    "id": 13676,
    "name": "fußzentrum augsburg orthopädie-schuhtechnik",
    "street": "Katharinengasse 24",
    "zip": 86150,
    "city": "Augsburg",
    "contactPerson": "Kai Fessl",
    "email": "rechnungen@fusszentrum-augsburg.de",
    "password": "yQxGg4LH0TOh"
  },
  {
    "id": 12111,
    "name": "Orthopädie-Schuhtechnik Burkholz",
    "street": "Badtorstr. 16",
    "zip": 71711,
    "city": "Steinheim an der Murr",
    "contactPerson": "Markus Burkholz",
    "email": "post@burkholz-orthopaedie.de",
    "password": "FxfiezS8B7gN"
  },
  {
    "id": 11562,
    "name": "Basler Orthopädie René Ruepp AG",
    "street": "Austr. 109",
    "zip": 4051,
    "city": "Basel",
    "contactPerson": "Florence Ruepp",
    "email": "info@rene-ruepp.ch",
    "password": "XA4HhSaPJ2jQ"
  },
  {
    "id": 12787,
    "name": "Bernwieser Gmbh",
    "street": "Thierschstr. 22",
    "zip": 80538,
    "city": "München",
    "contactPerson": "Sebastian Strasser",
    "email": "info@bernwieser.de",
    "password": "PxBlPuysrrVP"
  },
  {
    "id": 20496,
    "name": "Ortoconsult & Solution SRL",
    "street": "Ganghoferstrasse 14",
    "zip": 83342,
    "city": "Tacherting",
    "contactPerson": "Paul Koliweszka",
    "email": "ortoconsult.solution@gmail.com",
    "password": "xiTdKAvzO6Gy"
  },
  {
    "id": 16539,
    "name": "Daniel Wirz Orthopädie Schuh Technik",
    "street": "Stumpfgasse 23",
    "zip": 53902,
    "city": "Bad Münstereifel",
    "contactPerson": "Daniel Wirz",
    "email": "info@wirz-orthopaedie.de",
    "password": "eW9Jhay22yoo"
  },
  {
    "id": 17399,
    "name": "Schuhe Orthopädie Walter ",
    "street": "Hauptstr. 26",
    "zip": 3372,
    "city": "BLINDENMARKT",
    "contactPerson": "Benjamin Walter",
    "email": "office@schuhe-walter.at",
    "password": "Hre9TB2GzcAX"
  },
  {
    "id": 15320,
    "name": "Orthopädie-Schuhtechnik",
    "street": "Hauptstr. 44",
    "zip": 58313,
    "city": "Herdecke",
    "contactPerson": "Michael Lippmann",
    "email": "ortho-lippmann@t-online.de",
    "password": "c8uJtx6VpVHJ"
  },
  {
    "id": 12342,
    "name": "Rehaland Orthopädietechnik GmbH",
    "street": "Nicolaistr. 24/26",
    "zip": 1307,
    "city": "Dresden",
    "contactPerson": "Herr Preuß",
    "email": "einkauf@rehaland.com",
    "password": "RIddiLouvkiX"
  },
  {
    "id": 10434,
    "name": "Efinger OST",
    "street": "Brettreichstr. 11",
    "zip": 97074,
    "city": "Würzburg",
    "contactPerson": "Udo Konrad",
    "email": "info@efinger-ot.de",
    "password": "y5y2141AaDJE"
  },
  {
    "id": 20469,
    "name": "Schuhwerk Neuss GbR",
    "street": "Adolf-Flecken-Str. 7",
    "zip": 41460,
    "city": "Neuss",
    "contactPerson": "Elisabeth Teneyken-Bertges",
    "email": "info@schuhwerk-neuss.de",
    "password": "eoQ4tUo7Nuux"
  },
  {
    "id": 12400,
    "name": "OST Jakob",
    "street": "Neustadt 37",
    "zip": 37154,
    "city": "Northeim",
    "contactPerson": "Stephan Jakob",
    "email": "osm.s.jakob@t-online.de",
    "password": "MSunEUaoFC5a"
  },
  {
    "id": 11376,
    "name": "Sanitätshaus OWB oHg",
    "street": "Klosterstr. 8",
    "zip": 13581,
    "city": "Berlin",
    "contactPerson": "Christian Alexandrow",
    "email": "ot@sanitaetshaus-owb.de",
    "password": "zBinEjbAFN88"
  },
  {
    "id": 19660,
    "name": "Perpedes GmbH",
    "street": "Tannenbergstr. 139",
    "zip": 73230,
    "city": "Kirchheim",
    "contactPerson": "Bosko Jokanovic",
    "email": "b.jokanovic@perpedes.de",
    "password": "Insole!2020"
  },
  {
    "id": 13906,
    "name": "Kajamed GmbH",
    "street": "Neefestr. 149",
    "zip": 9116,
    "city": "Chemnitz",
    "contactPerson": "Nicole Schwierz",
    "email": "info@kajamed.de",
    "password": "hXeQWgOOceMs"
  },
  {
    "id": 13045,
    "name": "Schuh+Sport Molitor GmbH",
    "street": "Belmer Str. 34/36",
    "zip": 49084,
    "city": "Osnabrück",
    "contactPerson": "Schuh + Sport Molitor",
    "email": "info@molitor-os.de",
    "password": "p4cMRiSq3LTp"
  },
  {
    "id": 10154,
    "name": "Kölsch Orthopädie-Schuh-Technik",
    "street": "Dr. Robert- Schelp- Platz 1",
    "zip": 66953,
    "city": "Pirmasens",
    "contactPerson": "Rainer Kölsch",
    "email": "info@ortho-koelsch.de",
    "password": "QwltOihwdlUb"
  },
  {
    "id": 12132,
    "name": "Orthopädietechnik Kempa & Beu OHG",
    "street": "Dieselstr. 16",
    "zip": 71696,
    "city": "Möglingen",
    "contactPerson": "Chiara ",
    "email": "info@kempaundbeu.de",
    "password": "qFO3SQMuK13y"
  },
  {
    "id": 11354,
    "name": "Orthopädie & Schuhtechnik Steinbrink GbR",
    "street": "Roggenmarkt 26",
    "zip": 59368,
    "city": "Werne",
    "contactPerson": "Arne Steinbrink",
    "email": "info@schuhtechnik-steinbrink.de",
    "password": "Zanmv1Vw6Gwv"
  },
  {
    "id": 11078,
    "name": "OrthopädieschuhMeisterei Tilman Steger",
    "street": "Blumenstr. 5",
    "zip": 85244,
    "city": "Röhrmoos",
    "contactPerson": "Tilman Steger",
    "email": "info@orthopaedieschuhmeisterei.de",
    "password": "Nlx7peHfliqu"
  },
  {
    "id": 14007,
    "name": "Sanitätshaus Weigel GmbH&Co.KG",
    "street": "Breiter Weg 1",
    "zip": 31787,
    "city": "Hameln",
    "contactPerson": "Doris Sydow",
    "email": "info@sanitaetshaus-weigel.de",
    "password": "2uqgJN13YtDB"
  },
  {
    "id": 13562,
    "name": "Petry Schuh-Service ",
    "street": "Schloßstr. 26",
    "zip": 67292,
    "city": "Kirchheimbolanden",
    "contactPerson": "Thomas Petry ",
    "email": "info@petry-schuh-service.de",
    "password": "cc2w5IjlbBuh"
  },
  {
    "id": 12820,
    "name": "Berrischen",
    "street": "Geldener Str. 11",
    "zip": 47647,
    "city": "Kerken",
    "contactPerson": "Ralf Berrischen",
    "email": "info@berrischen.de",
    "password": "zzQJdJJaMZSe"
  },
  {
    "id": 14970,
    "name": "FUSSZENTRUM-DEMMER",
    "street": "Frauentorgasse 10",
    "zip": 3430,
    "city": "Tulln",
    "contactPerson": "Eva Demmer",
    "email": "office@fusszentrum-demmer.at",
    "password": "7gbpvwenkdoB"
  },
  {
    "id": 12603,
    "name": "Borghoff Schuhhaus u. Orthopädie GmbH",
    "street": "Sauerlandstr. 87",
    "zip": 34431,
    "city": "Marsberg",
    "contactPerson": "Philipp Dülme",
    "email": "duelme@borghoff-bredelar.de",
    "password": "XTtjzh2irx4A"
  }
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
        (user) => user.email === email && user.password === password,
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
