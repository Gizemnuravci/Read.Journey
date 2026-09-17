import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import AuthPreview from "../../components/auth/AuthPreview/AuthPreview";
import Notification from "../../components/common/Notification/Notification";
import SpriteIcon from "../../components/common/SpriteIcon/SpriteIcon";
import layout from "../../components/auth/AuthLayout/AuthLayout.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/recommended");
    } catch (err) {
      setNotification(err || "Login failed");
    }
  };

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
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>

      <AuthPreview />

      <Notification
        message={notification}
        type="error"
        onClose={() => setNotification(null)}
      />
    </section>
  );
}
