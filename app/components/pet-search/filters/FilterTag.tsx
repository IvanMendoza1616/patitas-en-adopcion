import { capitalizeFirstLetter } from "@/app/utils/textFormat";

type Props = {
  filter: string | null;
  prefix?: string;
  suffix?: string;
};

export default function FilterTag({ filter, prefix, suffix }: Props) {
  if (!filter) return;

  return filter.split(",").map((value) => (
    <div key={value} className="bg-primary-light rounded-md px-4 py-1">
      {prefix}
      {capitalizeFirstLetter(value === "x-large" ? "X-Large" : value)}
      {suffix}
    </div>
  ));
}
