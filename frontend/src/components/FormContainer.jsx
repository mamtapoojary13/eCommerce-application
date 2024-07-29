import Container from "./Container";
// eslint-disable-next-line react/prop-types
export default function FormContainer({ children }) {
  return (
    <Container>
      <div className="flex justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </Container>
  );
}
