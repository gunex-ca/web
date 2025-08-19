import Navbar from "../_components/Navbar";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar showBorder />
      {children}
    </>
  );
}
