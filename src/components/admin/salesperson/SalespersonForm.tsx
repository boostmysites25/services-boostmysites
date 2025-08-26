import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { SalespersonLink, AVAILABLE_SERVICES, salespersonLinkService } from '@/services/salespersonLinkService';
import { GoogleTagExamples } from './GoogleTagExamples';

interface SalespersonFormProps {
  salesperson?: SalespersonLink;
  onSuccess: () => void;
  onCancel: () => void;
}

export const SalespersonForm: React.FC<SalespersonFormProps> = ({
  salesperson,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    salesperson_name: salesperson?.salesperson_name || '',
    display_name: salesperson?.display_name || '',
    email: salesperson?.email || '',
    phone: salesperson?.phone || '',
    services: salesperson?.services || [],
    is_active: salesperson?.is_active ?? true,
    conversion_tag: salesperson?.conversion_tag || '',
    gtag_script: salesperson?.gtag_script || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, serviceId]
        : prev.services.filter(s => s !== serviceId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.salesperson_name || !formData.display_name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.services.length === 0) {
      toast.error('Please select at least one service');
      return;
    }



    setIsSubmitting(true);
    
    try {
      if (salesperson?.id) {
        await salespersonLinkService.updateSalespersonLink(salesperson.id, formData);
        toast.success('Salesperson updated successfully!');
      } else {
        await salespersonLinkService.createSalespersonLink(formData);
        toast.success('Salesperson created successfully!');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving salesperson:', error);
      toast.error('Failed to save salesperson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GoogleTagExamples />
      <Card>
        <CardHeader>
          <CardTitle>
            {salesperson ? 'Edit Salesperson' : 'Add New Salesperson'}
          </CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="salesperson_name">URL Name *</Label>
            <Input
              id="salesperson_name"
              value={formData.salesperson_name}
              onChange={(e) => setFormData(prev => ({ ...prev, salesperson_name: e.target.value }))}
              placeholder="john-doe (used in URL)"
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              This will be used in the URL. Only lowercase letters, numbers, and hyphens allowed.
            </p>
          </div>

          <div>
            <Label htmlFor="display_name">Full Name *</Label>
            <Input
              id="display_name"
              value={formData.display_name}
              onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@boostmysites.in"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div>
            <Label htmlFor="conversion_tag">Conversion Event Tag</Label>
            <Textarea
              id="conversion_tag"
              value={formData.conversion_tag}
              onChange={(e) => setFormData(prev => ({ ...prev, conversion_tag: e.target.value }))}
              placeholder="Paste conversion event snippet here"
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This tag will be inserted in the &lt;head&gt; section. Usually contains the conversion event snippet.
            </p>
          </div>

          <div>
            <Label htmlFor="gtag_script">Google Tag (gtag.js)</Label>
            <Textarea
              id="gtag_script"
              value={formData.gtag_script}
              onChange={(e) => setFormData(prev => ({ ...prev, gtag_script: e.target.value }))}
              placeholder="Paste Google tag (gtag.js) script here"
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This tag will be inserted in the &lt;head&gt; section. Usually contains the gtag.js script.
            </p>
          </div>

          <div>
            <Label>Services *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {AVAILABLE_SERVICES.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.services.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                  />
                  <Label htmlFor={service.id} className="text-sm">
                    {service.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (salesperson ? 'Update' : 'Create')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </>
  );
};