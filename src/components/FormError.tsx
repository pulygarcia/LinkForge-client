interface FormErrorProps {
    error?: string | null; // error message is optional ('?')
}

export default function FormError({ error }: FormErrorProps) {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return null;
}