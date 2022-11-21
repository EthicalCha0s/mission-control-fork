const Reaction = ({ reaction, index, loading }) => {
  if (loading) return <div className="loading-line ml-3 h-10 w-12 rounded-full"></div>;

  if(/\P{Extended_Pictographic}/u.test(reaction.emoji.name)) return;
  return (
    <div className={`${index === 0 ? "" : "ml-3"} flex items-center rounded-2xl bg-gray-300 py-1 px-2 dark:bg-slate-800 lg:px-3`}>
      <p>{reaction.emoji.name}</p>
      <p className="ml-1 xl:ml-2 text-sm dark:text-gray-100 lg:text-base">{reaction.count}</p>
    </div>
  );
};

export default Reaction;
