document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript file loaded successfully.');
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      alert(`You clicked on ${item.id}`);
    });
  });
});
