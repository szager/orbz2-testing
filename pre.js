function handle_error(e) {
  alert(`💩💩 ${e.message} 💩💩💩💩`);
}

window.addEventListener("error", handle_error, true);