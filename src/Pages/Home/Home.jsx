import CategoryBook from "./Shared/CategoryBook";
import FluentlyAskQuestion from "./Shared/FluentlyAskQuestion";
import Slider from "./Shared/Slider";
import Testimonial from "./Shared/Testimonial";

const Home = () => {
  return (
    <div className="space-y-10 mt-10">
      {/*Slider section  */}
      <section className="px-2">
        <Slider />
      </section>
      <section className="px-2">
        <CategoryBook />
      </section>
      <section className="px-2">
        <Testimonial />
      </section>
      <section>
        <FluentlyAskQuestion />
      </section>
    </div>
  );
};

export default Home;
