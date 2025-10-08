import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";

import image from "./test.png";

const sizes = [
  { value: "22", available: false },
  { value: "23", available: false },
  { value: "24", available: true },
  { value: "25", available: true },
  { value: "26", available: true },
  { value: "27", available: true },
  { value: "28", available: true },
  { value: "29", available: true },
  { value: "30", available: false },
  { value: "31", available: false },
  { value: "32", available: true },
  { value: "33", available: true },
  { value: "34", available: true },
  { value: "35", available: true },
  { value: "36", available: true },
  { value: "37", available: false },
  { value: "38", available: false },
  { value: "39", available: true },
  { value: "40", available: true },
];

const widths = ["02", "05", "08"];

const features = [
  "3 Width System",
  "Textile",
  "Goat Leather",
  "Ballet Flats",
  "Sandals",
  "Rose",
  "Velcro Closure",
  "Dryfeet",
];

export const Product = () => {
  const [selectedSize, setSelectedSize] = useState("24");
  const [selectedWidth, setSelectedWidth] = useState("08");
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [image, image, image];

  return (
    <div className="flex flex-col lg:flex-row gap-2 p-8">
      <div className="flex flex-col gap-2 flex-1">
        <Card className="w-full h-[600px] rounded-none border-none shadow-none bg-muted/50">
          <CardContent className="p-0 flex justify-center items-center h-full">
            <img
              src={images[selectedImage]}
              alt="Siena Light"
              className="max-w-full max-h-[500px] object-contain"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2 w-full">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "w-full h-48 object-cover cursor-pointer bg-muted/50",
                index === selectedImage && "border border-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 bg-muted/50 pt-20 pb-6 px-8">
        <>
          <p className="text-sm text-gray-500">Model ID: AX</p>
          <h1 className="text-5xl font-bold">SIENA LIGHT</h1>
          <p className="mt-4 text-gray-700">
            Starry Sky — this lightweight ankle boot made of black leather with
            star print will make you shine. The Velcro closure allows for a wide
            and comfortable entry as well as individual adjustment to the foot's
            width.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 text-xs text-gray-500">
            {features.map((feature) => (
              <Badge
                key={feature}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-gray-700 mt-2 underline">
              ← Back to selection
            </a>
            <p className="font-semibold mb-2"><span className="font-light">Mode:</span> Pairs</p>
          </div>

          <div className="flex justify-between items-center text-center mt-10">
            <p className="font-semibold text-2xl">Width</p>
            <div className="flex gap-2">
              {widths.map((w) => (
                <Button
                  key={w}
                  variant={w === selectedWidth ? "default" : "outline"}
                  onClick={() => setSelectedWidth(w)}
                >
                  {w}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-2 text-2xl">All sizes</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <Button
                key={s.value}
                variant={s.value === selectedSize ? "default" : "outline"}
                disabled={!s.available}
                onClick={() => setSelectedSize(s.value)}
                className={cn(!s.available && "opacity-50 cursor-not-allowed")}
              >
                {s.value}
              </Button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 text-sm mt-10">
            <span className="w-3 h-3 rounded-full bg-black inline-block"></span>
            <span>Available</span>
            <span className="w-3 h-3 rounded-full border border-gray-400 inline-block ml-4"></span>
            <span>Unavailable</span>
          </div>
        </div>

        <p className="mt-auto text-xs text-gray-400">HMV: 31.03.03.7035</p>
      </div>
    </div>
  );
};
