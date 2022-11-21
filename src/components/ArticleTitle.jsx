const ArticleTitle = ({ text, loading, link }) => {
  return (
    <h3
      className={`font-Montserrat text-[22px] 2xl:text-[26px] font-bold leading-10 text-slate-800 hover:text-black dark:text-indigo-100 dark:hover:text-white  lg:text-2xl ${
        loading ? "loading-line" : link && "underline decoration-moon-gold decoration-1 duration-200 hover:decoration-2"
      }`}
    >
      {!loading && link ? (
        <a target="_blank" href={link}>
          {text}
        </a>
      ) : (
        <>{text}</>
      )}
    </h3>
  );
};

export default ArticleTitle;
