import FluentlyAskQuestion from "./Shared/FluentlyAskQuestion";
import Slider from "./Shared/Slider";

const Home = () => {
  return (
    <div className="space-y-10 mt-10">
      {/*Slider section  */}
      <section className="px-2">
        <Slider />
      </section>
      <section>
        <FluentlyAskQuestion />
      </section>
    </div>
  );
};

export default Home;
