import { useCallback, useMemo } from "react";
import Chat from "./Chat.jsx";
import Loading from "../Loading.jsx";
import useGetMessages from "../../context/useGetMessages.js";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessages();
  useGetSocketMessage(); // Listen for new messages from the socket

  // Callback ref to scroll to the newest message (now at the top)
  const firstMsgRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Memoize message rendering for performance, newest message on top
  const renderedMessages = useMemo(
    () =>
      [...messages].reverse().map((message, idx, arr) => {
        const isFirst = idx === 0;
        return (
          <div
            ref={isFirst ? firstMsgRef : null}
            key={message._id || idx}
            className="mb-2"
          >
            <Chat message={message} />
          </div>
        );
      }),
    [messages, firstMsgRef]
  );

  return (
    <div
      className="scrollNone overflow-y-auto flex flex-col"
      style={{ maxHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        renderedMessages
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No messages to display. Please start conversation to view messages.
        </div>
      )}
    </div>
  );
}

export default Messages;
// This component displays messages in a chat application.
// It uses a custom hook to fetch messages and listens for new messages via a socket connection.
// The messages are displayed in reverse order, with the newest message at the top.
// It also includes a loading state and handles the case where there are no messages to display.
// The component uses a callback ref to scroll to the newest message automatically.
// The messages are rendered using the Chat component, which formats each message with the sender's information and timestamp.