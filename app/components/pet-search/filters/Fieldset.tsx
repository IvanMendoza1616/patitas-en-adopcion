import { ReadonlyURLSearchParams } from "next/navigation";

type inputValues = {
  value: string;
  label: string;
};

type Props = {
  queryParams: ReadonlyURLSearchParams;
  legend: string;
  fieldsetName: string;
  inputs: inputValues[];
};

export default function Fieldset({
  queryParams,
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
        defaultChecked={queryParams
          .get(fieldsetName)
          ?.split(",")
          .includes(input.value)}
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
