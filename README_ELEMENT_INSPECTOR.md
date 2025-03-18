# Element Inspector for Next.js

This project includes a Chrome-like element inspection tool integrated as a Next.js client component. It helps you:

1. Visually highlight elements as you hover over them
2. Send detailed element information to a parent window when elements are clicked

## Implementation Details

The element inspector is implemented as a React client component in Next.js, which is included in the root layout so it's available on all pages.

### Features

#### Visual Highlighting

When you hover over any element in the page:
- A blue highlight overlay appears around the element
- A tooltip shows the element's CSS selector (tag, ID, and classes)

#### Element Information Capture

When you click an element, detailed information about that element is sent to the parent window via `postMessage()`, including:
- Tag name
- ID
- Classes (both as a string and array)
- Full CSS selector
- Other attributes
- Text content (truncated if too long)

## How It Works

The inspector is implemented in `app/components/ElementInspector.tsx` as a client component that:
- Creates overlay and tooltip elements with appropriate styles
- Sets up event listeners for mouse events, scrolling, and resizing
- Provides clean-up when the component unmounts
- Properly types everything using TypeScript
- Includes a toggle button to enable/disable the inspector

The component is then imported in the root layout (`app/layout.tsx`), making it available across all pages of the application.

## User Interface

The element inspector includes a small toggle button fixed to the bottom-right corner of the screen:
- Blue button with '🔍 Inspecting' indicates the inspector is active
- Gray button with '🔍 Inspector Off' indicates the inspector is disabled
- Clicking the button toggles the inspector on/off

## Integration in Parent Window

To receive and process element information in the parent window, add this code:

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

## How to Test

1. Embed this application in an iframe within another page
2. Add the message event listener in the parent page as shown above
3. Hover over elements in the iframe to see the visual highlighting
4. Click any element to send its data to the parent

## Advantages of This Approach

- **Next.js Integration**: Properly integrated with Next.js app router as a client component
- **TypeScript Support**: Fully typed for better developer experience
- **Cleanup on Unmount**: Properly removes event listeners and DOM elements when not needed
- **No External File**: No need for a separate JS file in the public directory

## Customization

You can customize the appearance of the highlight overlay by modifying the styles in `public/clickTracker.js`. 