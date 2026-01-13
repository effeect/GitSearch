// Taken from here : https://bulma.io/documentation/components/navbar/
const Navbar = () => {
  return (
    <nav
      className="navbar is-justify-content-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          GitSearch
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
