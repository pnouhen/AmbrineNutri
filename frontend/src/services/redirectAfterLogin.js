export function redirectAfterLogin(navigate, location) {
  const previousPage = sessionStorage.getItem("previousPage");
  if (
    previousPage &&
    previousPage !== "/se-connecter" &&
    previousPage !== location.pathname
  ) {
    navigate(previousPage, { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}
