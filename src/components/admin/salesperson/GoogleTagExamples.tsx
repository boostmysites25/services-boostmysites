import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export const GoogleTagExamples: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const conversionTagExample = `<!-- Event snippet for SL conversion page -->
<script>
  gtag('event', 'conversion', {'send_to': 'AW-17461696177/TsTtCLyMh4QbELGtsYZB'});
</script>`;

  const gtagScriptExample = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17461696177"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17461696177');
</script>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} code copied to clipboard!`);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Google Tag Manager Examples</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? 'Hide' : 'Show'} Examples
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Conversion Event</Badge>
              <span className="text-sm text-muted-foreground">Paste this in the "Conversion Event Tag" field</span>
            </div>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {conversionTagExample}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(conversionTagExample, 'Conversion tag')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace AW-17461696177/TsTtCLyMh4QbELGtsYZB with your actual conversion ID
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Google Tag (gtag.js)</Badge>
              <span className="text-sm text-muted-foreground">Paste this in the "Google Tag (gtag.js)" field</span>
            </div>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {gtagScriptExample}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(gtagScriptExample, 'Google tag')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace AW-17461696177 with your actual Google Ads account ID
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <h4 className="font-medium text-blue-900 mb-2">How to get your Google Ads conversion tracking code:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Go to <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Ads</a></li>
              <li>2. Navigate to Tools & Settings → Conversions</li>
              <li>3. Create or select your conversion action</li>
              <li>4. Choose "Use Google tag" option</li>
              <li>5. Copy the conversion event snippet and gtag.js script</li>
              <li>6. Paste them in the respective fields above</li>
            </ol>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
