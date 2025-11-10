import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Group, Work, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" value="/" icon={<Home />} />
        <BottomNavigationAction label="Social" value="/social" icon={<Group />} />
        <BottomNavigationAction label="Tasks" value="/tasks" icon={<Work />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<AccountCircle />} />
      </BottomNavigation>
    </Paper>
  );
}
