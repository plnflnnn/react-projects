export default function ErrorMessage({ message = 'Please try again in a moment.' }) {
  return (
    <div className="px-4 py-16 text-center">
      <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
}
