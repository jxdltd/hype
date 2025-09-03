import {
  Button,
  Container,
  Head,
  Html,
  Img,
  Text,
} from "@react-email/components";

type Props = {
  verification: {
    code: string;
  };
  project: {
    name: string;
  };
  prospect: {
    id: string;
  };
};

export function VerifyEmail({ project, verification, prospect }: Props) {
  const url = encodeURI(
    `https://app.buildhype.dev/api/verify?code=${verification.code}&id=${prospect.id}`
  );

  return (
    <Html>
      <Head>
        <title>Verify Email</title>
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
          Verify your email
        </Text>
        <Text style={{ fontSize: "16px" }}>
          Thank you for signing up for {project.name}. Please use the following
          link to verify your email:
        </Text>
        <Button
          href={url}
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "bolder",
          }}
        >
          Verify Email
        </Button>
        <Text style={{ fontSize: "13px", color: "#666" }}>
          Link not working? Copy and paste the following into your browser:{" "}
          {url}
        </Text>
      </Container>
    </Html>
  );
}

export default function Example() {
  return (
    <VerifyEmail
      project={{ name: "Project 1" }}
      verification={{ code: "123456" }}
      prospect={{ id: "123456" }}
    />
  );
}
