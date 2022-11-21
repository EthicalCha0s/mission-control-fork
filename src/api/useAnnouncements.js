import { useState, useEffect } from "react";

export const useAnnouncements = () => {
  const ANNOUNCEMENTS_API_URL = import.meta.env.VITE_ANNOUNCEMENTS_API_URL;
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsError, setAnnouncementsError] = useState(null);
  const [announcementsLoaded, setAnnouncementsLoaded] = useState(false);

  useEffect(() => {
    fetch(ANNOUNCEMENTS_API_URL)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "401: Unauthorized") {
            setAnnouncementsError(true);
            setAnnouncements(result);
          } else {
            setAnnouncements(result);
            setAnnouncementsLoaded(true);
          }
        },
        (error) => setAnnouncementsError(error)
      );
  }, []);

  return { announcements, announcementsLoaded, announcementsError, setAnnouncements };
};
