import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { salespersonLinkService } from '@/services/salespersonLinkService';

interface UrlParamsData {
  salesperson?: string;
  service?: string;
  ref?: string;
  isValid: boolean;
  salespersonData?: any;
  serviceData?: any;
  isLoading: boolean;
}

export const useUrlParams = (): UrlParamsData => {
  const location = useLocation();
  const [data, setData] = useState<UrlParamsData>({
    isValid: false,
    isLoading: true
  });

  useEffect(() => {
    const parseAndValidateParams = async () => {
      try {
        // Parse URL parameters
        const urlParams = salespersonLinkService.parseUrlParams(window.location.href);
        
        if (urlParams.salesperson && urlParams.service) {
          // Validate the salesperson-service combination
          const validation = await salespersonLinkService.validateSalespersonService(
            urlParams.salesperson,
            urlParams.service
          );

          setData({
            salesperson: urlParams.salesperson,
            service: urlParams.service,
            ref: urlParams.ref,
            isValid: validation.valid,
            salespersonData: validation.salespersonData,
            serviceData: validation.serviceData,
            isLoading: false
          });
        } else {
          setData({
            isValid: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error parsing URL parameters:', error);
        setData({
          isValid: false,
          isLoading: false
        });
      }
    };

    parseAndValidateParams();
  }, [location]);

  return data;
}; 