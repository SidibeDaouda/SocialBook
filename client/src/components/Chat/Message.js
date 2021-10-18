import { format } from "timeago.js";

export default function Message({ message }) {
  return (
    <div className="">
      <div className="">
        <p className="">{message.text}</p>
      </div>
      <div className="">{format(message.createdAt)}</div>
    </div>
  );
}
