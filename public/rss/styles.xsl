<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> | RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          :root {
            color-scheme: dark;
          }
          
          body {
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.5;
            background: #1a1a1a;
            color: #00ff00;
            max-width: 64rem;
            margin: 0 auto;
            padding: 2rem;
          }
          
          h1 {
            font-size: 2rem;
            margin: 0 0 1rem 0;
            color: #00ffff;
          }
          
          h2 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem 0;
            color: #00ffff;
          }
          
          a {
            color: #00ffff;
            text-decoration: none;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          .post {
            margin: 2rem 0;
            padding: 1rem;
            background: #2a2a2a;
            border-radius: 0.5rem;
          }
          
          .post-title {
            margin: 0 0 0.5rem 0;
          }
          
          .post-meta {
            font-size: 0.875rem;
            color: #888;
          }
          
          .categories {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
          }
          
          .category {
            background: #333;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
          }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <p><xsl:value-of select="/rss/channel/description"/></p>
        
        <h2>Recent Posts</h2>
        <xsl:for-each select="/rss/channel/item">
          <div class="post">
            <h3 class="post-title">
              <a href="{link}"><xsl:value-of select="title"/></a>
            </h3>
            <div class="post-meta">
              <time><xsl:value-of select="pubDate"/></time>
            </div>
            <xsl:if test="category">
              <div class="categories">
                <xsl:for-each select="category">
                  <span class="category">
                    <xsl:value-of select="."/>
                  </span>
                </xsl:for-each>
              </div>
            </xsl:if>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>