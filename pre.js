function handle_error(e) {
  alert("💩💩💩💩" + e.message + "💩💩💩💩💩💩 on line " + String(e.lineno) + " in file " + String(e.filename));
}

window.addEventListener("error", handle_error, true);