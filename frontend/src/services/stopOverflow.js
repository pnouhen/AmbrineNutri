export function stopOverflow(condition) {
    console.log("ok")
    if (condition === false || condition === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}