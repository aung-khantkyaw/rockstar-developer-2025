import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export default function UserList({ title, data }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {title}
      </Typography>
      <List>
        {data.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemButton
                onClick={() => navigate(`/profile/${item.user.id}`)}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={item.user.name}
                  secondary={item.user.bio}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};
