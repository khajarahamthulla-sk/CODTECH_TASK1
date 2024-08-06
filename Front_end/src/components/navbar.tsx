export const Navbar = () => {
  return (
      <nav className="bg-black">
        <div className="container mx-auto flex justify-between items-center">
          {/* Top Left */}
          <div className="text-yellow-400 mt-7 ">
            <a href="/" className=" font-bold  italic  text-5xl ">
              WordPark
            </a>

            <div className="text-white">
            <a href="/" className="italic">
            Let's go have fun with friends!
            </a>

            </div>
          </div>
        </div>
      </nav>
  );
};
