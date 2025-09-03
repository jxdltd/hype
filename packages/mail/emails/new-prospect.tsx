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
          alignItems: "center",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <Img
          src="https://www.buildhype.dev/logo.png"
          alt="Hype"
          style={{ height: "24px", margin: "0 auto" }}
        />
        <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
          New Prospect
        </Text>
        <Text style={{ fontSize: "16px" }}>
          Congratulations! You have a new prospect{" "}
          <Link
            href={`mailto:${prospect.email}`}
            style={{ fontWeight: "bold" }}
          >
            {prospect.email}
          </Link>{" "}
          for your project {project.name}.
        </Text>
        <Button
          href={`https://app.buildhype.dev/projects/${project.id}/prospects`}
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
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
