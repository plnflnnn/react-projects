import slide from '../resources/grocery4.jpeg';

export default function MainPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="absolute left-6 top-1/2 z-10 max-w-xs -translate-y-1/2 text-3xl font-bold text-white drop-shadow sm:left-10 sm:max-w-md sm:text-4xl lg:text-5xl">
        Always fresh grocery for you!
      </h1>
      <img className="block w-full" src={slide} alt="Fresh grocery produce" />
    </section>
  );
}
