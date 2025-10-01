import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState, useRef } from "react";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xanpjnbz"); 
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);

      // Очищення форми
      formRef.current.reset();

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactWrapper}>
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <p className={styles.contactSubtitle}>
          Have questions or want to order? Send us a message!
        </p>

        <div className={styles.contactContent}>
          <form 
            className={styles.contactForm} 
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />

            <input type="email" name="email" placeholder="Your Email" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <textarea name="message" placeholder="Your Message" required />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            {/* Google reCAPTCHA */}
            <div className={styles.captchaWrapper}>
              <div className="g-recaptcha" data-sitekey="6Le7RtsrAAAAAI_I6B_fn3utCSMMqdhcNng_bD5K"></div>
            </div>

            <button type="submit" disabled={state.submitting}>
              {state.submitting ? (
                <span className={styles.spinner}></span>
              ) : (
                "Send Message"
              )}
            </button>

            {showSuccess && (
              <div className={styles.toast}>✅ Message sent successfully!</div>
            )}
          </form>

          <div className={styles.contactInfo}>
            <h3>Our Contacts</h3>
            <p>Email: support@coffee.com</p>
            <p>Phone: +380 123 456 789</p>
            <p>Address: Kyiv, Ukraine</p>
          </div>
        </div>
      </div>

      {/* Скрипт Google reCAPTCHA */}
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    </section>
  );
}
