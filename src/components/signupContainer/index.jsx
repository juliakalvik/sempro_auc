import SignUpForm from "../signupForm";
import SignupHeroSection from "../signupHero";
import "./signupContainer.css";

const SignupContainer = () => {
  return (
    <div className="signupContainerFlex">
      <SignUpForm />
      <SignupHeroSection />
    </div>
  );
};

export default SignupContainer;
