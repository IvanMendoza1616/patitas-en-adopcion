import { QueryParamsKeys } from "@/app/types/types";

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
    <div key={input.value} className="flex gap-2">
      <input
        type="checkbox"
        name={fieldsetName}
        id={input.value}
        value={input.value}
        defaultChecked={defaultValue?.split(",").includes(input.value)}
      />
      <label htmlFor={input.value}>{input.label}</label>
    </div>
  ));

  return (
    <fieldset className="flex flex-col gap-1">
      <legend>{legend}</legend>
      {inputsArray}
    </fieldset>
  );
}
