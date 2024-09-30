type Props = {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  className?: string;
  defaultValue?: string;
  required?: boolean;
};

export default function TextInput({
  label,
  placeholder,
  name,
  id,
  className,
  defaultValue,
  required,
}: Props) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        id={id}
        className="w-full rounded-md border px-3 py-2 focus:outline-primary"
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
