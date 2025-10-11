import { useState } from "react";
import { ColorPicker } from "@/components/partials/ColorPicker";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";

import type { Filters } from "@/hooks/useFilters";

export const Filter = ({ filtersData }: { filtersData: Filters }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  return (
    <>
      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Function</h3>
        {filtersData.variationFunctions.map((variationFunction) => (
          <div
            key={variationFunction.code}
            className="flex items-center space-x-2 mb-2"
          >
            <Checkbox id={variationFunction.code} />
            <Label
              htmlFor={variationFunction.code}
              className="text-sm font-normal"
            >
              {variationFunction.displayValue}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Shoe Type</h3>
        {filtersData.shoeTypes.map((shoeType) => (
          <div key={shoeType.id} className="flex items-center space-x-2 mb-2">
            <Checkbox id={shoeType.id.toString()} />
            <Label
              htmlFor={shoeType.id.toString()}
              className="text-sm font-normal"
            >
              {shoeType.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Closure System</h3>
        {filtersData.closureSystems.map((closureSystem) => (
          <div
            key={closureSystem.id}
            className="flex items-center space-x-2 mb-2"
          >
            <Checkbox id={closureSystem.id.toString()} />
            <Label
              htmlFor={closureSystem.id.toString()}
              className="text-sm font-normal"
            >
              {closureSystem.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Inner Lining</h3>
        {filtersData.innerLinings.map((innerLining) => (
          <div
            key={innerLining.id}
            className="flex items-center space-x-2 mb-2"
          >
            <Checkbox id={innerLining.id.toString()} />
            <Label
              htmlFor={innerLining.id.toString()}
              className="text-sm font-normal"
            >
              {innerLining.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Sole Type</h3>
        {filtersData.soleTypes.map((soleType) => (
          <div key={soleType.id} className="flex items-center space-x-2 mb-2">
            <Checkbox id={soleType.id.toString()} />
            <Label
              htmlFor={soleType.id.toString()}
              className="text-sm font-normal"
            >
              {soleType.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Colors</h3>
        <ColorPicker
          colors={filtersData.colors}
          selectedColors={selectedColors}
          onChange={setSelectedColors}
        />
      </div>
    </>
  );
};
