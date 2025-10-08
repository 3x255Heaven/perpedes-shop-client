import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-16 px-10 flex justify-between items-center text-sm gap-6">
      <div className="flex flex-col items-left justify-center gap-12">
        <div>
          <h4 className="font-semibold mb-2">Perpedes</h4>
          <p>Gesunder Fuß und Gutes Gefühl</p>
        </div>
        <div className="flex text-gray-400 gap-4">
          <Instagram className="cursor-pointer" />
          <Linkedin className="cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-around items-center gap-28">
        <div>
          <h4 className="font-semibold mb-2">Features</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Core features</li>
            <li>Pro experience</li>
            <li>Integrations</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Contact</li>
            <li>Support</li>
            <li>Legal</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Contact</li>
            <li>Support</li>
            <li>Legal</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
