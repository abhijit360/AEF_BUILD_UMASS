import { Container} from "@mui/material";
import Navbar from "./components/navbar";
export default function Home() {
  return (
      <Container sx={{bgcolor:"#5a86cc", height:"100vh"}}>
        <Navbar />
      </Container>
  );
}
