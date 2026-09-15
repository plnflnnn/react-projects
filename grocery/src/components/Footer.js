export default function Footer() {
  return (
    <footer className="bg-white">
      <p className="mb-8 mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Grocery store. All rights reserved.
      </p>
    </footer>
  );
}
