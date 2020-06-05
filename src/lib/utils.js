export default function timeAgo(ts) {
  const d = new Date()
  const nowTs = Math.floor(d.getTime()/1000)
  const seconds = nowTs - ts/1000;

  // more that two days
  if (seconds > 2 * 24 * 3600) {
      const days = Math.floor(seconds/(24 * 3600));
      return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  // a day
  if (seconds > 24 * 3600) {
     return 'yesterday';
  }
  if (seconds > 3600) {
     const hours = Math.floor(seconds/3600);
     return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (seconds > 60) {
     const minutes = Math.floor(seconds/60);
     return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  else {
    return `just now`;
 }
}
