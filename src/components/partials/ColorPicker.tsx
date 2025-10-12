import { colorMap } from "@/constants/colors";
import type { ProductFilterValue } from "@/hooks/useFilters";

interface ColorPickerProps {
  colors: ProductFilterValue[];
  selectedColors: string[];
  onChange: (selected: string[]) => void;
}

export const ColorPicker = ({
  colors,
  selectedColors,
  onChange,
}: ColorPickerProps) => {
  const toggleColor = (colorId: string) => {
    if (selectedColors.includes(colorId)) {
      onChange(selectedColors.filter((id) => id !== colorId));
    } else {
      onChange([...selectedColors, colorId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const hex = colorMap[color.name.toLowerCase()] || "#ccc";
        const isSelected = selectedColors.includes(color.id.toString());

        return (
          <button
            key={color.id}
            onClick={() => toggleColor(color.id.toString())}
            className={`relative w-8 h-8 rounded-full border transition-all
              ${isSelected ? "border-black" : "border-gray-300"}
            `}
            style={{ backgroundColor: hex }}
            title={color.name}
          />
        );
      })}
    </div>
  );
};
