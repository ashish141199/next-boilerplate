// Click tracker script
// This script adds a click event listener to track clicked elements 
// and send their class information to the parent window

document.addEventListener('click', function(event) {
  // Get the clicked element
  const clickedElement = event.target;
  
  // Extract class information
  const classInfo = clickedElement.className || 'no-class';
  
  // Send message to parent window
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'ELEMENT_CLICKED',
      class: classInfo
    }, '*');
    console.log('Posted message to parent:', classInfo);
  }
}, true); // Using capture phase to catch all clicks

console.log('Click tracker initialized'); 