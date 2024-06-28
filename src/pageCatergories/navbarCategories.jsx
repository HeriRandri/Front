export default function NavbarCategories() {
  return (
    <div>
      <nav className="mt-10 max-w-7xl mx-auto  shadow-lg  border-b-2 rounded-lg h-10">
        <ul className="flex justify-evenly">
          <li>
            {" "}
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/technology">Technology</a>
          </li>
          <li>
            <a href="/sport">Sport</a>
          </li>
          <li>
            <a href="/world">World</a>
          </li>
          <li>
            <a href="/science">Science</a>
          </li>
          <li>
            <a href="/heath">Heath</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
