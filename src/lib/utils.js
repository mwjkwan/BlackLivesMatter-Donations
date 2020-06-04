export default function timeAgo(ts) {
  const d = new Date()
  const nowTs = Math.floor(d.getTime()/1000)
  const seconds = nowTs - ts/1000;

  // more that two days
  if (seconds > 2 * 24 * 3600) {
     return `${Math.floor(seconds/(2 * 24 * 3600))} days ago`;
  }
  // a day
  if (seconds > 24 * 3600) {
     return 'yesterday';
  }
  if (seconds > 3600) {
     return `${Math.floor(seconds/3600)} hours ago`;
  }
  if (seconds > 60) {
     return `${Math.floor(seconds/60)} minutes ago`;
  }
  else {
    return `just now`;
 }
}
