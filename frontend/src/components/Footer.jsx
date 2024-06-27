import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import Logo_green from "../../public/logo-green.png";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src={Logo_green} alt="Natours logo" />
      </div>
      <ul className={styles.footer__nav}>
        <li>
          <Link to={"#"}>About us</Link>
        </li>
        <li>
          <Link to={"#"}>Download apps</Link>
        </li>
        <li>
          <Link to={"#"}>Become a guide</Link>
        </li>
        <li>
          <Link to={"#"}>Careers</Link>
        </li>
        <li>
          <Link to={"#"}>Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
