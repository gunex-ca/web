import { Body, Button, Head, Html, Tailwind } from "@react-email/components";
import { GunExFont } from "./_components/font";

const NewPostings = () => {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <GunExFont />
        </Head>

        <Body className="px-4">
          <h1>New Postings</h1>
          <p>Here are the new postings:</p>
          <Button className="w-full rounded-md bg-neutral-400">button</Button>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewPostings;
