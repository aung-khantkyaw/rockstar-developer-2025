// export default function Item({ item, remove }) {
//   return (
//     <li
//       style={{
//         padding: 10,
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//       }}
//     >
//       <span>
//         {item.content} -<b>{item.name}</b>
//       </span>
//       <button onClick={() => remove(item.id)}>Delete</button>
//     </li>
//   );
// }

// ################################################### //

// Chapter6 - React UI Framework MUI

// import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
// import {
//   Alarm as TimeIcon,
//   AccountCircle as UserIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";
// import { green } from "@mui/material/colors";
// export default function Item({ item, remove }) {
//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <TimeIcon fontSize="10" color="success" />
//             <Typography variant="caption" sx={{ color: green[500] }}>
//               A few second ago
//             </Typography>
//           </Box>
//           <IconButton size="small" onClick={() => remove(item.id)}>
//             <DeleteIcon fontSize="inherit" />
//           </IconButton>
//         </Box>
//         <Typography sx={{ my: 3 }}>{item.content}</Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <UserIcon fontSize="12" color="info" />
//           <Typography variant="caption">{item.name}</Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// ################################################### //

// Chapter8 - React Router

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";

import {
  Alarm as TimeIcon,
  AccountCircle as UserIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { green } from "@mui/material/colors";

import { formatRelative } from "date-fns";
export default function Item({ item, remove, primary, comment }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2 }}>
      {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}

      <CardContent
        onClick={() => {
          if (comment) return false;
          navigate(`/comments/${item.id}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TimeIcon fontSize="10" color="success" />
            <Typography variant="caption" sx={{ color: green[500] }}>
              {/* Chapter11 - React Router  */}
              {formatRelative(item.created, new Date())}
            </Typography>
          </Box>
          <IconButton
            sx={{ color: "text.fade" }}
            size="small"
            onClick={(e) => {
              remove(item.id);
              e.stopPropagation();
            }}
          >
            <DeleteIcon color="inherit" fontSize="inherit" />
          </IconButton>
        </Box>

        <Typography sx={{ my: 3 }}>{item.content}</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <UserIcon fontSize="12" color="info" />
          <Typography variant="caption">{item.user.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
