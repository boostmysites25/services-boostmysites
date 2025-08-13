import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export const GoogleTagExamples: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headTagExample = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`;

  const bodyTagExample = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

  const additionalTagExample = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
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
              <Badge variant="outline">Head Section</Badge>
              <span className="text-sm text-muted-foreground">Paste this in the "Google Tag (Head Section)" field</span>
            </div>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {headTagExample}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(headTagExample, 'Head tag')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace GTM-XXXXXXX with your actual Google Tag Manager container ID
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Body Section</Badge>
              <span className="text-sm text-muted-foreground">Paste this in the "Google Tag (Body Section)" field</span>
            </div>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {bodyTagExample}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(bodyTagExample, 'Body tag')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace GTM-XXXXXXX with your actual Google Tag Manager container ID
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Additional Tracking</Badge>
              <span className="text-sm text-muted-foreground">Optional: Paste additional tracking codes here</span>
            </div>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {additionalTagExample}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(additionalTagExample, 'Additional tracking')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace GA_MEASUREMENT_ID with your actual Google Analytics measurement ID
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <h4 className="font-medium text-blue-900 mb-2">How to get your Google Tag Manager code:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Go to <a href="https://tagmanager.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Tag Manager</a></li>
              <li>2. Select your container</li>
              <li>3. Click on "Admin" → "Install Google Tag Manager"</li>
              <li>4. Copy the two code snippets provided</li>
              <li>5. Paste them in the respective fields above</li>
            </ol>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
