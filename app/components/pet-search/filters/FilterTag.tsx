import { capitalizeFirstLetter } from "@/app/utils/textFormat";

type Props = {
  filter: string | null;
  suffix?: string;
};

export default function FilterTag({ filter, suffix }: Props) {
  if (!filter) return;

  return filter.split(",").map((value) => (
    <div key={value} className="rounded-md bg-gray-100 px-4 py-1">
      {capitalizeFirstLetter(value)}
      {suffix}
    </div>
  ));
}
