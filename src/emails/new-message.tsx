import { Body, Button, Head, Html, Tailwind } from "@react-email/components";
import { GunExFont } from "./_components/font";

type NewMessageProps = {
  listing?: {
    id?: string;
    price?: string;
    title?: string;
    image?: string;
  };
  sender?: {
    id?: string;
    name?: string;
    email?: string;
  };
  message?: string;
};

const Header = () => {
  return (
    <div className="bg-blue-600 px-6 py-4">
      <h1 className="font-bold text-2xl text-white">New Message</h1>
      <p className="text-blue-100">
        You have received a message about your listing
      </p>
    </div>
  );
};

const NewMessage: React.FC<NewMessageProps> = ({
  listing,
  sender,
  message,
}) => {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <GunExFont />
        </Head>

        <Body className="bg-neutral-50 px-4 py-6 font-sans">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-blue-600 px-6 py-4">
              <h1 className="font-bold text-2xl text-white">New Message</h1>
              <p className="text-blue-100">
                You have received a message about your listing
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Listing Info */}
              <div className="mb-6 space-y-1 rounded-lg bg-neutral-100 p-4">
                <h2 className="font-semibold text-lg text-neutral-800">
                  Regarding your listing:
                </h2>
                <div className="flex items-center gap-4">
                  <img
                    src={listing?.image ?? "https://placehold.co/600x400"}
                    alt={listing?.title ?? "No image available"}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-neutral-900">
                      {listing?.title ?? "Untitled Listing"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sender Info */}
              <div className="mb-6">
                <h2 className="mb-2 font-semibold text-lg text-neutral-800">
                  Message from:
                </h2>

                <div>
                  <p className="font-medium text-gray-900">
                    {sender?.name ?? "Unknown User"}
                  </p>
                  <p className="text-neutral-600 text-sm">
                    {sender?.email ?? "No email provided"}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <h2 className="mb-2 font-semibold text-lg text-neutral-800">
                  Message:
                </h2>
                <div className="rounded-lg border-blue-500 border-l-4 bg-neutral-50 p-4">
                  <p className="whitespace-pre-wrap text-neutral-700">
                    {message ?? "No message content"}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <Button
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/messages`}
                  className="inline-block rounded-md bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  View & Reply to Message
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-8 border-gray-200 border-t pt-6 text-center text-gray-600 text-sm">
                <p>
                  You're receiving this email because someone messaged you about
                  your listing on GunEx.
                </p>
                <p className="mt-2">
                  Visit your{" "}
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/messages`}
                    className="text-blue-600 hover:underline"
                  >
                    messages
                  </a>{" "}
                  to manage all conversations.
                </p>
              </div>
            </div>
          </div>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewMessage;
