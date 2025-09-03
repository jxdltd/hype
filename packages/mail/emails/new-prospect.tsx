import { Button, Head, Html } from "@react-email/components";

type Props = {
  project: {
    id: string;
  };
};

export function NewProspectEmail({ project }: Props) {
  return (
    <Html>
      <Head>
        <title>New Prospect</title>
      </Head>
      <Button
        href={`https://app.buildhype.dev/projects/${project.id}/prospects`}
        style={{
          background: "#000",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
        }}
      >
        View Prospects
      </Button>
    </Html>
  );
}

export default function Example() {
  return <NewProspectEmail project={{ id: "1" }} />;
}
