import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ColorPicker } from "@/components/partials/ColorPicker";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import type { Filters } from "@/hooks/useFilters";

export const Filter = React.memo(
  ({ filtersData }: { filtersData: Filters }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selected, setSelected] = useState({
      variationFunctions: [] as string[],
      shoeTypes: [] as string[],
      closureSystems: [] as string[],
      innerLinings: [] as string[],
      soleTypes: [] as string[],
      colors: [] as string[],
    });

    const filterKeys = [
      "variationFunctions",
      "shoeTypes",
      "closureSystems",
      "innerLinings",
      "soleTypes",
      "colors",
    ] as const;

    useEffect(() => {
      const newSelected: typeof selected = {} as typeof selected;

      filterKeys.forEach((key) => {
        newSelected[key] = searchParams.getAll(key);
      });

      setSelected(newSelected);
    }, [searchParams]);

    const updateFilter = (
      key: keyof typeof selected,
      value: string,
      checked: boolean
    ) => {
      const current = new Set(selected[key]);
      checked ? current.add(value) : current.delete(value);

      const updated = { ...selected, [key]: Array.from(current) };
      setSelected(updated);

      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      updated[key].forEach((v) => newParams.append(key, v));

      setSearchParams(newParams);
    };

    const handleColorChange = (newColors: string[]) => {
      const updated = { ...selected, colors: newColors };
      setSelected(updated);

      const newParams = new URLSearchParams(searchParams);
      newParams.delete("colors");
      newColors.forEach((color) => newParams.append("colors", color));

      setSearchParams(newParams);
    };

    return (
      <>
        <div className="mb-6 mr-6 border-b pb-4">
          <h3 className="font-medium text-sm mb-2">Function</h3>
          {filtersData.variationFunctions.map((variationFunction) => (
            <div
              key={variationFunction.code}
              className="flex items-center space-x-2 mb-2"
            >
              <Checkbox
                id={variationFunction.code}
                checked={selected.variationFunctions.includes(
                  variationFunction.code
                )}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "variationFunctions",
                    variationFunction.code,
                    Boolean(checked)
                  )
                }
              />
              <Label
                htmlFor={variationFunction.code}
                className="text-sm font-normal"
              >
                {variationFunction.code}
              </Label>
            </div>
          ))}
        </div>

        <div className="mb-6 mr-6 border-b pb-4">
          <h3 className="font-medium text-sm mb-2">Shoe Type</h3>
          {filtersData.shoeTypes.map((shoeType) => (
            <div key={shoeType.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={shoeType.id.toString()}
                checked={selected.shoeTypes.includes(shoeType.id.toString())}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "shoeTypes",
                    shoeType.id.toString(),
                    Boolean(checked)
                  )
                }
              />
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
              <Checkbox
                id={closureSystem.id.toString()}
                checked={selected.closureSystems.includes(
                  closureSystem.id.toString()
                )}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "closureSystems",
                    closureSystem.id.toString(),
                    Boolean(checked)
                  )
                }
              />
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
              <Checkbox
                id={innerLining.id.toString()}
                checked={selected.innerLinings.includes(
                  innerLining.id.toString()
                )}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "innerLinings",
                    innerLining.id.toString(),
                    Boolean(checked)
                  )
                }
              />
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
              <Checkbox
                id={soleType.id.toString()}
                checked={selected.soleTypes.includes(soleType.id.toString())}
                onCheckedChange={(checked) =>
                  updateFilter(
                    "soleTypes",
                    soleType.id.toString(),
                    Boolean(checked)
                  )
                }
              />
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
            selectedColors={selected.colors}
            onChange={handleColorChange}
          />
        </div>
      </>
    );
  }
);

Filter.displayName = "Filter";
