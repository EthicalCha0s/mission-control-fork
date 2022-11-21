import Reaction from "./Reaction";
import AnnouncementContent from "./AnnouncementContent";
import React from "react";

const Announcement = React.forwardRef(({ content, mentions, author, timestamp, reactions, loading, attachments }, ref) => {
  const avatar = `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.webp?size=80`;
  const name = author.username;
  const time = new Date(timestamp).toDateString();

  const AnnouncementBody = (
    <div className={`relative mt-10 w-[336px] rounded-2xl text-gray-900  sm:w-[400px] lg:mt-10 lg:w-full ${loading && "loading-component"}`}>
      <div className="blur-background rounded-2xl"></div>

      <div className="component-background relative rounded-2xl border border-gray-300 px-3 py-3 sm:px-4 lg:py-5 lg:px-6 xl:px-12 xl:py-9">
        {/*Avatar, Name, Date */}
        <div className="flex items-center">
          {loading ? (
            <div className="loading-line h-16 w-16 rounded-full"></div>
          ) : (
            <img alt={`${name} Discord's Avatar`} src={avatar} className="2xl:[h-75px] h-[60px] w-auto rounded-full object-cover lg:h-[70px]" />
          )}

          <div className="ml-6 flex flex-col">
            <p className={`inline-block font-mono text-sm text-blue-600 dark:text-moon-orange xl:text-base ${loading && "loading-line"}`}>{time}</p>
            <h4
              className={`mt-1 font-GoodTimes text-xl lg:text-3xl xl:text-3xl ${
                loading ? "loading-line" : "bg-gradient-to-b from-yellow-600 to-amber-500 bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-100"
              }`}
            >
              {name}
            </h4>
          </div>
        </div>

        {/*Content*/}
        <div className="mt-2 lg:mt-4 2xl:mt-6">
          <AnnouncementContent text={content} mentions={mentions} loading={loading} />
        </div>

        {/*Attachments*/}
        <div className="rows mt-2 grid gap-4 lg:mt-4 2xl:mt-6">
          {attachments && attachments.map((attachment, i) => <img className="h-auto max-w-[300px] lg:max-w-[400px] 2xl:max-w-[450px]" key={i} src={attachment.url} />)}
        </div>

        {/*Reactions*/}
        <div className="mt-3 flex overflow-x-auto lg:mt-5 2xl:mt-6">
          {reactions && reactions.map((reaction, i) => <Reaction key={i} reaction={reaction} index={i} loading={loading} />)}
        </div>
      </div>
    </div>
  );

  const result = ref ? <article ref={ref}>{AnnouncementBody}</article> : <article>{AnnouncementBody}</article>;

  return result;
});

export default Announcement;
