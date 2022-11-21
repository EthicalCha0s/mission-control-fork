export const updateAnnouncements = async (id, announcements, setAnnouncements, setUpdating, setUpdatingError) => {
    setUpdating(true)
    setUpdatingError(false)
    const NEXT_ANNOUNCEMENTS_URL = import.meta.env.VITE_ANNOUNCEMENTS_API_URL + `?before=${id}`;

    const response = await fetch(NEXT_ANNOUNCEMENTS_URL)
    if (response.status >= 400 && response.status < 600){
        setUpdatingError(true)
        setUpdating(false)
        return;
    }
    const nextAnnouncements = await response.json()

    setAnnouncements([...announcements, ...nextAnnouncements])
    setUpdating(false)

}

