import ToggleTheme from "./toggleTheme";
import SearchBox from "./searchBox";

const Navbar = ({ isDarkTheme, setIsDarkTheme, navClasses, searchProps }) => {
  return (
    <nav className={`flex items-center justify-between w-full p-4 md:p-6 shadow-lg ${navClasses}`}>
      {/* Search box + toggle */}
      <SearchBox
        type="Search here..."
        placeholder="Search here..."
        isDarkTheme={isDarkTheme}
        {...searchProps}
      />

      {/* Toggle dark/light theme */}
      <ToggleTheme isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
    </nav>
  );
};

export default Navbar;
