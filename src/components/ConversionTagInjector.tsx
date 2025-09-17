import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { salespersonLinkService, SalespersonLink } from '@/services/salespersonLinkService';
import { GoogleTagInjector } from './GoogleTagInjector';

export const ConversionTagInjector: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [salespersonData, setSalespersonData] = useState<SalespersonLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSalespersonData = async () => {
      try {
        // Get salesperson from URL parameters
        const salesperson = searchParams.get('salesperson');
        const service = searchParams.get('service');
        
        if (salesperson) {
          console.log('🔍 ConversionTagInjector: Fetching salesperson data for:', salesperson);
          
          // Fetch all salespersons and find the matching one
          const salespersons = await salespersonLinkService.getSalespersonLinks();
          console.log({salespersons})
          const foundSalesperson = salespersons.find(
            (sp) => sp.salesperson_name === salesperson && sp.is_active
          );
          
          if (foundSalesperson) {
            console.log('🔍 ConversionTagInjector: Found salesperson:', foundSalesperson);
            setSalespersonData(foundSalesperson);
          } else {
            console.log('🔍 ConversionTagInjector: Salesperson not found or inactive');
          }
        } else {
          console.log('🔍 ConversionTagInjector: No salesperson in URL params');
        }
      } catch (error) {
        console.error('🔍 ConversionTagInjector: Error fetching salesperson data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalespersonData();
  }, [searchParams]);

  if (isLoading) {
    return null; // Don't render anything while loading
  }

  if (!salespersonData) {
    return null; // Don't render anything if no salesperson data
  }

  // Inject both gtag script and conversion tag to ensure gtag is available
  return <GoogleTagInjector salespersonData={salespersonData} tagType="both" />;
};
