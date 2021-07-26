import { parseISO } from "date-fns";
import { useIntl, useNow } from "next-intl";

const useTime = () => {
  const intl = useIntl();
  const now = useNow();

  const relativeTime = (time) => intl.formatRelativeTime(time, now);
  const formatTime = (time) =>
    intl.formatDateTime(parseISO(time), {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

  return { relativeTime, formatTime };
};

export { useTime };
