function handle_error(e) {
  alert(`💩💩 ${e.message} 💩 at line number ${e.lineNumber} 💩💩💩💩`);
}

window.addEventListener("error", handle_error, true);