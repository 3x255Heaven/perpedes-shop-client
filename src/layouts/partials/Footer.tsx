import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-12 px-6 md:px-16 lg:px-24 flex flex-col-reverse lg:flex-row md:flex-row justify-between gap-10 md:gap-16 text-sm">
      <div className="flex flex-col gap-6 md:gap-12">
        <div>
          <h4 className="font-semibold mb-2">Perpedes</h4>
          <p>Orthopädie-Schuhtechnik für Menschen in Bewegung</p>
        </div>
        <div className="flex gap-4 text-gray-400">
          <Instagram className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
          <Linkedin className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="flex flex-wrap gap-8 md:gap-28 mt-8 md:mt-0">
        <div className="min-w-[120px]">
          <h4 className="font-semibold mb-2">Features</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Core features</li>
            <li>Pro experience</li>
            <li>Integrations</li>
          </ul>
        </div>

        <div className="min-w-[120px]">
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Contact</li>
            <li>Support</li>
            <li>Legal</li>
          </ul>
        </div>

        <div className="min-w-[120px]">
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Blog</li>
            <li>Guides</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
