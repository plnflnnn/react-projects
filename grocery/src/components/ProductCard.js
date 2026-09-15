import { Link } from 'react-router-dom';
import { slugify } from '../utils/format';

export default function ProductCard({ item }) {
  return (
    <Link
      to={`/products/${slugify(item.item_category)}/${slugify(item.item_name)}`}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item.item_src}
          alt={item.item_name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{item.item_name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${item.item_price} per pound</p>
    </Link>
  );
}
