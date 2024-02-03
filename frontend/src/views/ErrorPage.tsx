import { Stack, Typography, styled } from "@mui/material";

const ErrorPage: React.FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  return (
    <Stack
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt={4}
      spacing={2}
    >
      <Typography fontWeight="bold">Something Went Wrong</Typography>
      <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
    </Stack>
  );
};
export default ErrorPage;

const ErrorMessageContainer = styled("code")({
  width: "100%",
  fontSize: "0.75em",
  overflowX: "auto",
  maxWidth: "600px",
  color: "black",
  backgroundColor: "#ddd",
  textAlign: "left",
  padding: "0.5em",
  borderRadius: "0.5em",
});
