document.addEventListener('DOMContentLoaded', () => {
  if (navigator && navigator.gpu) {
    let old_orbee_interactions = the_game.__proto__.orbee_interactions;
    the_game.__proto__.orbee_interactions = () => {
      old_orbee_interactions.bind(this)();
    };
  }
});
