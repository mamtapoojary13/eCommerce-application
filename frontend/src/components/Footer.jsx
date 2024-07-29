import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <div className="flex justify-center py-4">
          <p>Proshop &copy; {currentYear}</p>
        </div>
      </Container>
    </footer>
  );
}
