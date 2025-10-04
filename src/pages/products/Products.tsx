import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import { Card, CardContent } from "@/components/shared/card";

import image from "./test.png";

type Product = {
  id: number;
  name: string;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Alabama Light", image: image },
  { id: 2, name: "Almaz3 Light", image: image },
  { id: 3, name: "Arizona", image: image },
  { id: 4, name: "Boston", image: image },
  { id: 5, name: "Florida", image: image },
  { id: 6, name: "Siena Light", image: image },
  { id: 7, name: "Alabama Light", image: image },
  { id: 8, name: "Almaz3 Light", image: image },
  { id: 9, name: "Arizona", image: image },
  { id: 10, name: "Boston", image: image },
  { id: 11, name: "Florida", image: image },
  { id: 12, name: "Siena Light", image: image },
  { id: 13, name: "Alabama Light", image: image },
  { id: 14, name: "Almaz3 Light", image: image },
  { id: 15, name: "Arizona", image: image },
  { id: 16, name: "Boston", image: image },
  { id: 17, name: "Florida", image: image },
  { id: 18, name: "Siena Light", image: image },
];

export const Products = () => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col flex-1">
        {/* HEADER (exact design from screenshot) */}
        <header className="border-b px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black"
            >
              <path d="M12 2L2 12h10l-2 10 10-10H12z" />
            </svg>
          </div>

          <nav className="flex space-x-6 text-sm font-medium">
            {[
              "Alle Schuhe",
              "Ballerina",
              "Halbschuhe",
              "Halbstiefel",
              "Sandalen",
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={cn(
                  "hover:underline",
                  idx === 0 && "font-semibold underline"
                )}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-5">
            <Search className="w-5 h-5 cursor-pointer" />
            <User className="w-5 h-5 cursor-pointer" />
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
          </div>
        </header>

        {/* SUBHEADER with Title + Filter Toggle */}
        <div className="border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">All Shoes</h1>
          <Button
            variant="secondary"
            className="rounded-sm px-3 py-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "×" : "Filter"}
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Filter (animated, full filters from screenshot) */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 256,
                  opacity: 1,
                  transition: { duration: 0.4 },
                }}
                exit={{
                  width: 0,
                  opacity: 0,
                  transition: { duration: 0 },
                }}
                transition={{ duration: 0.7 }}
                className="border-r px-6 py-6 overflow-y-auto"
              >
                <h2 className="font-semibold mb-4">Filter</h2>

                {/* Gender */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">Geschlecht</h3>
                  {["Damen", "Herren", "Kinder"].map((label, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <Checkbox id={`gender-${idx}`} />
                      <Label
                        htmlFor={`gender-${idx}`}
                        className="text-sm font-normal"
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Color */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">Farbe</h3>
                  {["Schwarz", "Weiß", "Braun", "Blau", "Rot"].map(
                    (label, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox id={`color-${idx}`} />
                        <Label
                          htmlFor={`color-${idx}`}
                          className="text-sm font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </div>

                {/* Size */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">Größe</h3>
                  {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
                    (label, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox id={`size-${idx}`} />
                        <Label
                          htmlFor={`size-${idx}`}
                          className="text-sm font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </div>

                {/* Closure System */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">Verschlusssystem</h3>
                  {["Schnürsenkel", "Klettverschluss", "BOA"].map(
                    (label, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox id={`closure-${idx}`} />
                        <Label
                          htmlFor={`closure-${idx}`}
                          className="text-sm font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </div>

                {/* Material */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">Material</h3>
                  {["Leder", "Textil", "Synthetik"].map((label, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <Checkbox id={`material-${idx}`} />
                      <Label
                        htmlFor={`material-${idx}`}
                        className="text-sm font-normal"
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid (animated layout) */}
          <motion.main
            layout
            className="flex-1 p-8 overflow-y-auto"
            transition={{ duration: 0.4 }}
          >
            <motion.div
              layout
              className={cn(
                "grid gap-10",
                showFilters ? "grid-cols-2" : "grid-cols-3"
              )}
              transition={{ duration: 0.4 }}
            >
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-none border-0 flex flex-col items-center"
                >
                  <CardContent className="p-0 flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-48 h-48 object-contain mb-3"
                    />
                    <span className="text-sm font-medium">{product.name}</span>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* More Products Button */}
            <div className="flex justify-center mt-12">
              <Button className="px-8 py-6 rounded-none text-lg">
                more products
              </Button>
            </div>
          </motion.main>
        </div>

        {/* FOOTER */}
        <footer className="border-t py-8 px-10 grid grid-cols-3 text-sm gap-6">
          <div>
            <h4 className="font-semibold mb-2">Perpedes</h4>
            <p>Gesunder Fuß und Gutes Gefühl</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="space-y-1">
              <li>Core features</li>
              <li>Pro experience</li>
              <li>Integrations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1">
              <li>Contact</li>
              <li>Support</li>
              <li>Legal</li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};
