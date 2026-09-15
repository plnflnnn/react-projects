import { Link } from 'react-router-dom';

export default function NotFoundItems() {
  return (
    <div className="mx-auto h-96 px-4 pb-10 pt-10 text-center">
      <h1 className="mt-10 pt-10 text-2xl font-semibold text-gray-900">No items found</h1>
      <p className="mt-4 text-gray-600">Try another category or browse the full catalog.</p>
      <Link to="/products" className="mt-6 inline-block text-sm font-semibold text-indigo-600">
        View all products
      </Link>
    </div>
  );
}
