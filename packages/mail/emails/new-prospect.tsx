import {
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Text,
} from "@react-email/components";

type Props = {
  project: {
    id: string;
    name: string;
  };
  prospect: {
    email: string;
  };
};

export function NewProspectEmail({ project, prospect }: Props) {
  return (
    <Html>
      <Head>
        <title>New Prospect</title>
      </Head>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "32px",
        }}
      >
        <Img
          src="https://www.buildhype.dev/logo.png"
          alt="Hype"
          style={{ height: "16px" }}
        />
        <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
          Congratulations! You have a new prospect
        </Text>
        <Text style={{ fontSize: "16px" }}>
          <Link
            href={`mailto:${prospect.email}`}
            style={{ fontWeight: "bolder" }}
          >
            {prospect.email}
          </Link>{" "}
          has joined the waiting list for {project.name}.
        </Text>
        <Button
          href={`https://app.buildhype.dev/projects/${project.id}/prospects`}
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "bolder",
          }}
        >
          View Prospects
        </Button>
      </Container>
    </Html>
  );
}

export default function Example() {
  return (
    <NewProspectEmail
      project={{ id: "1", name: "Project 1" }}
      prospect={{ email: "test@test.com" }}
    />
  );
}
