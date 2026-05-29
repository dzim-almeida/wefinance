export default function Button({
  label,
  type = "button",
  onClick,
}: {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <button
      className="px-4 py-2 w-full bg-green-700 text-white rounded-md hover:bg-green-900 cursor-pointer"
      type={type}
      formAction={onClick} 
    >
      {label}
    </button>
  );
}
