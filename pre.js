function handle_error(e) {
  alert("💩💩💩💩" + e.message + "💩💩💩💩💩💩 on line " + String(e.lineno));
}

window.addEventListener("error", handle_error, true);