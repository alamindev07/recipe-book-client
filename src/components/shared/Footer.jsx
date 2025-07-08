const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>© 2025 Recipe Book — All rights reserved.</p>
        <p>Contact: support@recipebook.com</p>
        <div className="flex space-x-3 mt-2">
          <a href="#"><i className="text-xl fab fa-facebook"></i></a>
          <a href="#"><i className="text-xl fab fa-instagram"></i></a>
          <a href="#"><i className="text-xl fab fa-twitter"></i></a>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
