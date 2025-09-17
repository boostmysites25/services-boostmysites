import React, { useEffect } from 'react';

interface GoogleTagInjectorProps {
  salespersonData?: {
    conversion_tag?: string | null;
    gtag_script?: string | null;
  };
  tagType?: 'conversion' | 'gtag' | 'both';
}

export const GoogleTagInjector: React.FC<GoogleTagInjectorProps> = ({ salespersonData, tagType = 'both' }) => {
  useEffect(() => {
    if (!salespersonData) return;

    console.log('🔍 GoogleTagInjector: Injecting tags for salesperson:', salespersonData, 'Tag type:', tagType);

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

    // Function to inject conversion tag with gtag dependency check
    const injectConversionTag = () => {
      if (salespersonData.conversion_tag && (tagType === 'conversion' || tagType === 'both')) {
        console.log('🔍 GoogleTagInjector: Injecting conversion tag');
        
        // Check if gtag is available, if not wait for it
        if (typeof window !== 'undefined' && window.gtag) {
          injectHTML(salespersonData.conversion_tag, document.head);
        } else {
          // Wait for gtag to be available
          const checkGtag = () => {
            if (typeof window !== 'undefined' && window.gtag) {
              injectHTML(salespersonData.conversion_tag, document.head);
            } else {
              setTimeout(checkGtag, 100);
            }
          };
          checkGtag();
        }
      }
    };

    // Inject Google tag (gtag.js) first (only if tagType is 'gtag' or 'both')
    if (salespersonData.gtag_script && (tagType === 'gtag' || tagType === 'both')) {
      console.log('🔍 GoogleTagInjector: Injecting Google tag');
      injectHTML(salespersonData.gtag_script, document.head);
      
      // If we're injecting both tags, wait for gtag to load before injecting conversion tag
      if (tagType === 'both' && salespersonData.conversion_tag) {
        // Wait a bit for gtag to initialize
        setTimeout(injectConversionTag, 500);
      }
    } else if (tagType === 'conversion' && salespersonData.conversion_tag) {
      // If only conversion tag is needed, inject it directly
      injectConversionTag();
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
  }, [salespersonData, tagType]);

  // This component doesn't render anything visible
  return null;
};
