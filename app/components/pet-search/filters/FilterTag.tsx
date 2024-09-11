import { capitalizeFirstLetter } from "@/app/utils/textFormat";

type Props = {
  filter: string | null;
  suffix?: string;
};

export default function FilterTag({ filter, suffix }: Props) {
  if (!filter) return;

  return filter.split(",").map((value) => (
    <div key={value} className="bg-gray-300 px-2">
      {capitalizeFirstLetter(value)}
      {suffix}
    </div>
  ));
}
