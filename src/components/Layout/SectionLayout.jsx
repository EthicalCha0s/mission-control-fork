const SectionLayout = ({ children, twoSection }) => {
  return (
    <section
      className={`mt-[96px] flex flex-col lg:relative lg:w-[80%] ${
        twoSection ? "lg:w-[93%]" : "lg:w-[80%]"
      } lg:px-[58px] lg:pb-[56px] xl:px-16 2xl:px-20`}
    >

      <span className="lg:relative">{children}</span>
    </section>
  );
};

export default SectionLayout;


//      