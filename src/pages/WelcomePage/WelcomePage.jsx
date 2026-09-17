import { Link } from "react-router-dom";
import AuthPreview from "../../components/auth/AuthPreview/AuthPreview";
import SpriteIcon from "../../components/common/SpriteIcon/SpriteIcon";
import layout from "../../components/auth/AuthLayout/AuthLayout.module.css";

export default function WelcomePage() {
  return (
    <section className={layout.page}>
      <div className={layout.leftPanel}>
        <div className={layout.content}>
          <div className={layout.logo}>
            <SpriteIcon id="icon-Logo-1" className={layout.logoIcon} />
            <span>READ JOURNEY</span>
          </div>
          <h1 className={layout.title}>
            Expand your mind, reading{" "}
            <span className={layout.titleMuted}>a book</span>
          </h1>
          <div className={layout.actions}>
            <Link to="/register" className={layout.btnPrimary}>
              Get started
            </Link>
            <Link to="/login" className={layout.btnSecondary}>
              Log in
            </Link>
          </div>
        </div>
      </div>

      <AuthPreview />
    </section>
  );
}
