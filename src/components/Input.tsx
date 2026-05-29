import { ChangeEvent } from "react";

export default function Input({
    label,
    type = 'text',
    name,
    value,
    onChange
}: {
    label: string;
    type?: 'text' | 'number' | 'email' | 'password';
    name: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label}</label>
            <input className="px-2 py-1 bg-zinc-50 border rounded-md" type={type} name={name} value={value} onChange={onChange} />
        </div>
    )
}