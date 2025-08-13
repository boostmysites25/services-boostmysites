import React, { useEffect } from 'react';

interface GoogleTagInjectorProps {
  salespersonData?: {
    tag1?: string | null;
    tag2?: string | null;
    tag3?: string | null;
  };
}

export const GoogleTagInjector: React.FC<GoogleTagInjectorProps> = ({ salespersonData }) => {
  useEffect(() => {
    if (!salespersonData) return;

    console.log('🔍 GoogleTagInjector: Injecting tags for salesperson:', salespersonData);

    const injectedElements: Element[] = [];

    // Function to parse and inject HTML content
    const injectHTML = (html: string, container: Element, position: 'append' | 'prepend' = 'append') => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Extract and execute script tags
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        
        // Copy all attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy content
        newScript.textContent = script.textContent;
        
        // Add data attribute for cleanup
        newScript.setAttribute('data-salesperson-tag', 'script');
        injectedElements.push(newScript);
        
        // Insert script in the same position as the original
        if (position === 'prepend') {
          container.insertBefore(newScript, container.firstChild);
        } else {
          container.appendChild(newScript);
        }
      });
      
      // Remove script tags from temp div and append remaining content
      scripts.forEach(script => script.remove());
      if (tempDiv.innerHTML.trim()) {
        const contentDiv = document.createElement('div');
        contentDiv.setAttribute('data-salesperson-tag', 'content');
        contentDiv.innerHTML = tempDiv.innerHTML;
        injectedElements.push(contentDiv);
        
        if (position === 'prepend') {
          container.insertBefore(contentDiv, container.firstChild);
        } else {
          container.appendChild(contentDiv);
        }
      }
    };

    // Inject head tag (tag1)
    if (salespersonData.tag1) {
      console.log('🔍 GoogleTagInjector: Injecting head tag');
      injectHTML(salespersonData.tag1, document.head);
    }

    // Inject body tag (tag2) - this will be placed at the beginning of body
    if (salespersonData.tag2) {
      console.log('🔍 GoogleTagInjector: Injecting body tag');
      injectHTML(salespersonData.tag2, document.body, 'prepend');
    }

    // Inject additional tracking code (tag3) - this will be placed at the end of body
    if (salespersonData.tag3) {
      console.log('🔍 GoogleTagInjector: Injecting additional tracking code');
      injectHTML(salespersonData.tag3, document.body);
    }

    // Cleanup function to remove injected tags when component unmounts
    return () => {
      console.log('🔍 GoogleTagInjector: Cleaning up injected tags');
      // Remove all injected elements
      injectedElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [salespersonData]);

  // This component doesn't render anything visible
  return null;
};
