# Self-Contained Element Inspector for Next.js

This project includes a drop-in element inspector that works automatically with no dependencies or imports.

## How to Use

1. Simply place the `template.tsx` file in your `app/` directory
2. That's it! No other files need to be modified
3. To disable the inspector, remove or rename the file

## What it Does

This inspector provides Chrome-like element inspection functionality:

1. **Visual Highlighting**
   - Highlights elements when you hover over them with smooth animations
   - Shows a tooltip with the element's CSS selector
   - Features a pulsing animation effect on the highlighted element
   - Shows a brief orange flash animation when elements are clicked
   
2. **Element Information Capture**
   - Sends detailed information about clicked elements to a parent window
   - Useful when your app is embedded in an iframe

3. **Universal Pointer Cursor**
   - Changes the cursor to a pointer for all elements in the application
   - Makes it clear that all elements are clickable/inspectable

## How it Works

The implementation uses Next.js App Router's `template.tsx` special file, which is automatically applied to all pages in your application without needing to be imported.

The inspector is **always enabled** when the file exists. To disable it, you must remove or rename the file. This ensures that inspection is always available when needed.

The inspector adds a few elements to the DOM:
- An overlay element for highlighting that smoothly animates between elements
- A tooltip element that shows selector information
- A style element that sets cursor: pointer for all elements

## Animations

The inspector includes several animations to enhance the user experience:

1. **Smooth Transitions**: The highlight box smoothly animates from one element to another
2. **Pulsing Glow Effect**: The highlighted element has a subtle pulsing glow effect
3. **Click Flash**: When an element is clicked, the highlight briefly flashes orange

## Integration in Parent Window

To receive and process element information in a parent window, add this code:

```javascript
window.addEventListener('message', (event) => {
  // Check origin if needed for security
  // if (event.origin !== 'https://your-trusted-domain.com') return;
  
  const data = event.data;
  
  if (data && data.type === 'ELEMENT_CLICKED') {
    console.log('Element clicked:', data.element);
    
    // Access specific properties
    console.log('Tag:', data.element.tagName);
    console.log('Classes:', data.element.classes);
    console.log('Selector:', data.element.selector);
    console.log('Text:', data.element.textContent);
    
    // Do something with the element information
    // ...
  }
});
```

## Why This Approach?

- **Zero Configuration**: Works out of the box with no setup
- **No Imports**: Doesn't require importing in any other files
- **Single File**: All functionality in one self-contained file
- **Always On**: If the file exists, inspection is active
- **Visual Feedback**: Smooth animations provide excellent visual feedback
- **Universal Pointer**: Makes all elements appear clickable
- **TypeScript**: Fully typed for better developer experience
- **Clean Implementation**: Properly handles React lifecycle for cleanup 