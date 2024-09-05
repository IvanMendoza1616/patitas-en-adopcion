export default function Navbar() {
  return (
    <div className="bg-black">
      <nav className="mx-auto flex h-[100px] max-w-[1200px] items-center justify-between bg-black px-8 text-white">
        <p>Logo</p>
        <ul className="flex items-center justify-center gap-4">
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
    </div>
  );
}
