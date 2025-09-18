import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export function ContactMail({
  name,
  email,
  phone,
  subject,
  message,
  eventType,
  eventDate,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  eventType?: string;
  eventDate?: string;
}) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Nova Mensagem - Camila Retrata!</Text>
          
          <Text style={paragraph}>
            <b>Nome: </b> {name}
          </Text>
          
          <Text style={paragraph}>
            <b>E-mail: </b> {email}
          </Text>
          
          {phone && (
            <Text style={paragraph}>
              <b>Telefone: </b> {phone}
            </Text>
          )}
          
          <Text style={paragraph}>
            <b>Assunto: </b> {subject}
          </Text>
          
          {eventType && (
            <Text style={paragraph}>
              <b>Tipo de Evento: </b> {eventType}
            </Text>
          )}
          
          {eventDate && (
            <Text style={paragraph}>
              <b>Data do Evento: </b> {new Date(eventDate).toLocaleDateString('pt-BR')}
            </Text>
          )}
          
          <Text style={paragraph}>
            <b>Mensagem: </b>
          </Text>
          
          <Text style={messageStyle}>
            {message}
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "28px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#776E59",
  marginBottom: "24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#333333",
  marginBottom: "12px",
};

const messageStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  backgroundColor: "#f9f9f9",
  padding: "16px",
  borderRadius: "4px",
  whiteSpace: "pre-wrap" as const,
};
