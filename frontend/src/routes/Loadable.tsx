import { LinearProgress, LinearProgressProps, styled } from "@mui/material";
import { FC, LazyExoticComponent, Suspense } from "react";

type LoaderProps = LinearProgressProps;

/** Wraps a Lazy Loaded component with a Suspense component */
const Loadable = (
  Component: LazyExoticComponent<FC>
): ((props: LoaderProps) => JSX.Element) => {
  const SuspensedLoadable = (props: LoaderProps) => (
    <Suspense fallback={<Loader {...props} />}>
      <Component />
    </Suspense>
  );
  return SuspensedLoadable;
};
export default Loadable;

/**
 * Renders a linear, indefinitely loading progress bar. Used mostly in
 * lazy loading components to put in the suspense.
 */
const Loader: React.FC = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// Styles
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});