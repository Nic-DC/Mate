import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const ImageAvatar = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/client/public/AImate.png" sx={{ width: 56, height: 56 }} />
    </Stack>
  );
};
export default ImageAvatar;
