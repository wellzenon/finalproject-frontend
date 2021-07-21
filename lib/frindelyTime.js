import { useRouter } from "next/router";

const friendlyTime = (time) => {
  const timeDate = new Date(time);
  const options = {
    style: "long",
  };

  const rtf = new Intl.RelativeTimeFormat("en", options);
  console.log({
    time,
    timeDate,
  });
  return time;
};

const friendlyTime2 = (time) => {
  const today = new Date();
  const timeDate = new Date(time);
  const [todayYear, todayMonth, todayDay] = today.toISOString().split(/[T:.-]/);
  const [timeYear, timeMonth, timeDay] = timeDate.toISOString().split(/[T:.-]/);

  const minutesPast = Math.floor(
    (today.getTime() - timeDate.getTime()) / (60 * 1000)
  );
  if (minutesPast < 2) return `a minute ago`;
  if (minutesPast < 60) return `${minutesPast} minutes ago`;

  const hoursPast = Math.floor(minutesPast / 60);
  if (minutesPast < 3 * 60)
    return `${hoursPast}h ${minutesPast - hoursPast * 60}min ago`;

  const isToday =
    timeDay === todayDay && timeMonth === todayMonth && timeYear === todayYear;
  if (isToday) return `today ${timeDate.toLocaleTimeString()}`;

  const isYesterday =
    timeDay === todayDay - 1 &&
    timeMonth === todayMonth &&
    timeYear === todayYear;
  if (isYesterday) return `yesterday ${timeDate.toLocaleTimeString()}`;

  return timeDate.toLocaleString();
};

export { friendlyTime };
