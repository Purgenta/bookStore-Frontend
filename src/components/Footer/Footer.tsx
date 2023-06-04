const Footer = () => {
  return (
    <footer>
      <h4>
        Developed by Nikola Todorovic.All rights reserved<br></br>
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h4>
    </footer>
  );
};

export default Footer;
