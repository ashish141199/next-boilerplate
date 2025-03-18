'use client';

import { useEffect } from 'react';

/**
 * Element Inspector Template
 * 
 * This file is a self-contained element inspector that loads automatically
 * across all pages in a Next.js App Router project.
 * 
 * Just add this file to your app/ directory as template.tsx and it will work
 * without modifying any other files.
 * 
 * The inspector is always enabled when this file exists.
 * Features:
 * - Chrome-like element highlighting
 * - Smooth animations between elements
 * - Cursor always shows as pointer
 */

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Create an overlay element for highlighting
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.border = '2px solid #00c8ff';
    overlay.style.background = 'rgba(66, 153, 225, 0.2)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none'; 
    overlay.style.display = 'none';
    overlay.style.boxSizing = 'border-box';
    // Add smooth transition for all properties
    overlay.style.transition = 'all 0.3s ease-out';
    // Add animation
    overlay.style.boxShadow = '0 0 0 rgba(0, 200, 255, 0)';
    
    // Create info tooltip
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#333';
    tooltip.style.color = 'white';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '10000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    tooltip.style.maxWidth = '300px';
    tooltip.style.wordBreak = 'break-all';
    tooltip.style.transition = 'all 0.3s ease-out';
    tooltip.style.opacity = '0';
    
    // Create a style element for global cursor styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Add them to the body
    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);
    
    // Track current hovered element
    let hoveredElement: Element | null = null;
    
    // Helper function to get element details
    function getElementDetails(element: Element) {
      const tagName = element.tagName.toLowerCase();
      const id = element.id ? `#${element.id}` : '';
      const classes = Array.from(element.classList).map(c => `.${c}`).join('');
      
      // Get attributes
      const attributes: Record<string, string> = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        if (attr.name !== 'class' && attr.name !== 'id') {
          attributes[attr.name] = attr.value;
        }
      }
      
      // Text content (trimmed)
      const textContent = element.textContent?.trim().substring(0, 100) || '';
      
      return {
        tagName,
        id,
        classes: element.className || '',
        classArray: Array.from(element.classList),
        selector: `${tagName}${id}${classes}`,
        attributes,
        textContent: textContent + (textContent.length >= 100 ? '...' : '')
      };
    }
    
    // Function to animate the overlay
    function animateOverlay() {
      // Create a keyframe animation for the glow effect
      let glowing = false;
      
      setInterval(() => {
        if (!hoveredElement) return;
        
        if (glowing) {
          overlay.style.boxShadow = '0 0 0 rgba(0, 200, 255, 0)';
          overlay.style.borderColor = '#00c8ff';
        } else {
          overlay.style.boxShadow = '0 0 10px rgba(0, 200, 255, 0.7)';
          overlay.style.borderColor = '#00d8ff';
        }
        
        glowing = !glowing;
      }, 1000);
    }
    
    // Start the animation
    animateOverlay();
    
    // Function to update overlay position
    function updateOverlay(element: Element | null) {
      if (!element) {
        overlay.style.opacity = '0';
        tooltip.style.opacity = '0';
        
        // Hide after transition completes
        setTimeout(() => {
          if (!hoveredElement) {
            overlay.style.display = 'none';
            tooltip.style.display = 'none';
          }
        }, 300);
        return;
      }
      
      const rect = element.getBoundingClientRect();
      
      // Make sure elements are displayed before setting properties
      // to ensure transitions work
      if (overlay.style.display === 'none') {
        overlay.style.display = 'block';
        overlay.style.opacity = '0';
        // Position immediately without transition for initial placement
        overlay.style.transition = 'none';
        overlay.style.top = `${window.scrollY + rect.top}px`;
        overlay.style.left = `${window.scrollX + rect.left}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        
        // Force reflow
        void overlay.offsetWidth;
        
        // Restore transition
        overlay.style.transition = 'all 0.3s ease-out';
      }
      
      // Update position with animation
      overlay.style.top = `${window.scrollY + rect.top}px`;
      overlay.style.left = `${window.scrollX + rect.left}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.opacity = '1';
      
      // Update tooltip
      const details = getElementDetails(element);
      tooltip.textContent = details.selector;
      
      if (tooltip.style.display === 'none') {
        tooltip.style.display = 'block';
        tooltip.style.opacity = '0';
      }
      
      tooltip.style.top = `${window.scrollY + rect.top - tooltip.offsetHeight - 5}px`;
      tooltip.style.left = `${window.scrollX + rect.left}px`;
      tooltip.style.opacity = '1';
      
      // If tooltip goes above the viewport, position it below the element
      if (window.scrollY + rect.top - tooltip.offsetHeight < window.scrollY) {
        tooltip.style.top = `${window.scrollY + rect.bottom + 5}px`;
      }
    }
    
    // Mouse over handler
    const handleMouseOver = (event: MouseEvent) => {
      hoveredElement = event.target as Element;
      updateOverlay(hoveredElement);
    };
    
    // Mouse out handler
    const handleMouseOut = (event: MouseEvent) => {
      if (event.target === hoveredElement) {
        hoveredElement = null;
        updateOverlay(null);
      }
    };
    
    // Click handler
    const handleClick = (event: MouseEvent) => {
      const clickedElement = event.target as Element;
      const elementDetails = getElementDetails(clickedElement);
      
      // Add a brief flash animation to indicate the click
      const originalBorderColor = overlay.style.borderColor;
      const originalBoxShadow = overlay.style.boxShadow;
      
      overlay.style.borderColor = '#ff3d00';
      overlay.style.boxShadow = '0 0 20px rgba(255, 61, 0, 0.7)';
      
      setTimeout(() => {
        if (hoveredElement) {
          overlay.style.borderColor = originalBorderColor;
          overlay.style.boxShadow = originalBoxShadow;
        }
      }, 300);
      
      // Send message to parent window
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'ELEMENT_CLICKED',
          element: elementDetails
        }, '*');
        console.log('Posted element details to parent:', elementDetails);
      }
    };
    
    // Handle scroll and resize events
    const handleScroll = () => {
      if (hoveredElement) {
        updateOverlay(hoveredElement);
      }
    };
    
    const handleResize = () => {
      if (hoveredElement) {
        updateOverlay(hoveredElement);
      }
    };
    
    // Add event listeners
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    console.log('Element inspector initialized - always enabled with animations');
    
    // Clean up on component unmount
    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Simply return the children with no toggle button
  return <>{children}</>;
} 