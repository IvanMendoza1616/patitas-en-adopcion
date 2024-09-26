import { QueryParamsKeys } from "@/app/types/types";
import CheckboxInput from "../../UI/inputs/CheckboxInput";

type inputValues = {
  value: string;
  label: string;
};

type Props = {
  defaultValue: string | null;
  legend: string;
  fieldsetName: QueryParamsKeys;
  inputs: inputValues[];
};

export default function Fieldset({
  defaultValue,
  legend,
  fieldsetName,
  inputs,
}: Props) {
  const inputsArray = inputs.map((input) => (
    <CheckboxInput
      key={input.value}
      label={input.label}
      name={fieldsetName}
      id={input.value}
      value={input.value}
      defaultChecked={defaultValue?.split(",").includes(input.value)}
    />
  ));

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-1 text-lg font-semibold">{legend}</legend>
      {inputsArray}
    </fieldset>
  );
}
