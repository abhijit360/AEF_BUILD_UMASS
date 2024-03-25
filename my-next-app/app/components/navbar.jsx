import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/base/Button"
import Dropdown from "@mui/base/Dropdown";
import MenuButton from "@mui/base/MenuButton";
import Menu from "@mui/base/Menu";
import MenuItem from "@mui/base/MenuItem";

const Navbar = () => {
  const navigation_routes = [
    "Home",
    "About",
    "Out Sponsors",
    "Contact Us",
    "Support out cause",
  ];
  return (
    <>
      <Box sx={{ bgcolor: "white" }}>
        <Stack spacing={2} direction="row">
          {navigation_routes.map((nav_item) => (
              <Button>{nav_item}</Button>
          ))}
        </Stack>
      </Box>
      <Box>
        <Dropdown>
          <MenuButton>Home</MenuButton>
          <Menu>
            <MenuItem>About</MenuItem>
            <MenuItem>Our Sponsors</MenuItem>
            <MenuItem>Contact us!</MenuItem>
            <MenuItem>Support out cause</MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </>
  );
};

export default Navbar;
