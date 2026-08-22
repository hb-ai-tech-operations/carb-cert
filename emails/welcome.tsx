import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html, Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';


const WelcomeEmail = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-koala">
        <Preview>
          The sales intelligence platform that helps you uncover qualified
          leads.
        </Preview>
        <Container className="mx-auto py-5 pb-12">
          <Text className="text-[16px] leading-[26px]">
            Hi User,
          </Text>
          <Text className="text-[16px] leading-[26px]">
            Welcome to Koala, the sales intelligence platform that helps you
            uncover qualified leads and close deals faster.
          </Text>
          <Section className="text-center">
            <Button
              className="bg-[#5F51E8] rounded-[3px] text-white text-[16px] no-underline text-center block p-3"
              href="https://getkoala.com"
            >
              Get started
            </Button>
          </Section>
          <Text className="text-[16px] leading-[26px]">
            Best,
            <br />
            The Koala team
          </Text>
          <Hr className="border-[#cccccc] my-5" />
          <Text className="text-[#8898aa] text-[12px]">
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;
