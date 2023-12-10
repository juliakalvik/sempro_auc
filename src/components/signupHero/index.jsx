import "./signupHero.css";

export default function SignupHeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 pb-44">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tl from-turq to-yellow opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 99.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl lg:pt-36 md:pt-36 pt-10">
        <div className="text-center">
          <h1 className="lg:text-6xl font-extrabold tracking-tight md:text-6xl text-gray-900 text-3xl">
            Join{" "}
            <span className="inline-block pl-2 text-7xl transform skew-x-[-18deg]">
              G
              <span className="bg-gradient-to-tl from-turq to-black text-transparent bg-clip-text">
                AV
              </span>
              EL
            </span>{" "}
            today
          </h1>
          <h2 className="lg:text-6xl font-extrabold text-3xl md:text-4xl">
            and get 1000 cash points for free!
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Just fill out the form and you are ready!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="./login"
              className=" text-sm font-semibold text-turq hover:text-gray-900"
            >
              Already a member? Log in to your account here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
