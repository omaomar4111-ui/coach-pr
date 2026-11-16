'use client';

import React from 'react';
import Script from 'next/script';

interface ChatWidgetProps {
  websiteToken?: string;
  baseUrl?: string;
}

export default function ChatWidget({
  websiteToken = 'coachprb_client_widget_token',
  baseUrl = 'https://app.chatwoot.com',
}: ChatWidgetProps) {
  return (
    <Script id="chatwoot-widget" strategy="lazyOnload">
      {`
        (function(d,t) {
          var BASE_URL="${baseUrl}";
          var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src=BASE_URL+"/packs/js/sdk.js";
          g.defer = true;
          g.async = true;
          s.parentNode.insertBefore(g,s);
          g.onload=function(){
            if (window.chatwootSDK) {
              window.chatwootSDK.run({
                websiteToken: '${websiteToken}',
                baseUrl: BASE_URL
              });
            }
          }
        })(document,"script");
      `}
    </Script>
  );
}
