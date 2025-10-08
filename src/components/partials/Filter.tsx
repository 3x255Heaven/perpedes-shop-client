import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";

export const Filter = () => {
  return (
    <>
      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Geschlecht</h3>
        {["Damen", "Herren", "Kinder"].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <Checkbox id={`gender-${idx}`} />
            <Label htmlFor={`gender-${idx}`} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Farbe</h3>
        {["Schwarz", "Weiß", "Braun", "Blau", "Rot"].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <Checkbox id={`color-${idx}`} />
            <Label htmlFor={`color-${idx}`} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Größe</h3>
        {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
          (label, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <Checkbox id={`size-${idx}`} />
              <Label htmlFor={`size-${idx}`} className="text-sm font-normal">
                {label}
              </Label>
            </div>
          )
        )}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Verschlusssystem</h3>
        {["Schnürsenkel", "Klettverschluss", "BOA"].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <Checkbox id={`closure-${idx}`} />
            <Label htmlFor={`closure-${idx}`} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6 mr-6 border-b pb-4">
        <h3 className="font-medium text-sm mb-2">Material</h3>
        {["Leder", "Textil", "Synthetik"].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <Checkbox id={`material-${idx}`} />
            <Label htmlFor={`material-${idx}`} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
};
