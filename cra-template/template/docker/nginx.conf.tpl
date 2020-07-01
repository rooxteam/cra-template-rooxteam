server {
  listen  8080;
  #server_name  _;

  ssi on;

  access_log /dev/stdout;
  error_log /dev/stdout info;

  # Compression

  # Enable Gzip compressed.
  gzip on;

  # Compression level (1-9).
  # 5 is a perfect compromise between size and cpu usage, offering about
  # 75% reduction for most ascii files (almost identical to level 9).
  gzip_comp_level    5;

  # Don't compress anything that's already small and unlikely to shrink much
  # if at all (the default is 20 bytes, which is bad as that usually leads to
  # larger files after gzipping).
  gzip_min_length    256;

  # Compress data even for clients that are connecting to us via proxies,
  # identified by the "Via" header (required for CloudFront).
  gzip_proxied	   any;

  # Tell proxies to cache both the gzipped and regular version of a resource
  # whenever the client's Accept-Encoding capabilities header varies;
  # Avoids the issue where a non-gzip capable client (which is extremely rare
  # today) would display gibberish if their proxy gave them the gzipped version.
  gzip_vary          on;

  # Compress all output labeled with one of the following MIME-types.
  gzip_types
    application/atom+xml
    application/javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/schema+json
    application/vnd.geo+json
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-javascript
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/eot
    font/opentype
    image/bmp
    image/svg+xml
    image/vnd.microsoft.icon
    image/x-icon
    text/cache-manifest
    text/css
    text/javascript
    text/plain
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy
    text/xml;
    # text/html is always compressed by HttpGzipModule

  # This should be turned on if you are going to have pre-compressed copies (.gz) of
  # static files available. If not it should be left off as it will cause extra I/O
  # for the check. It is best if you enable this in a location{} block for
  # a specific directory, or on an individual server{} level.
  gzip_static on;


  brotli on;
  brotli_comp_level 4;
  brotli_buffers 32 8k;
  brotli_min_length 100;
  brotli_static on;
  brotli_types
    application/atom+xml
    application/javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/schema+json
    application/vnd.geo+json
    application/vnd.ms-fontobject
    application/x-javascript
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    image/bmp
    image/svg+xml
    image/vnd.microsoft.icon
    image/x-icon
    text/cache-manifest
    text/css
    text/javascript
    text/plain
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy
    text/xml;

  #Skip old browsers
  #gzip_disable Firefox/([0-2]\.|3\.0);
  #gzip_disable Chrome/2;
  #gzip_disable Safari;

  # Force the latest IE version
  add_header "X-UA-Compatible" "IE=Edge";

  root   /usr/share/nginx/html;

  location = / {
    root /usr/share/nginx/html;
    gzip_static off;
    brotli_static off;
    include /usr/share/nginx/html/preload[.]conf;
  }

  location = /index.html {
    root /usr/share/nginx/html;
    gzip_static off;
    brotli_static off;
    include /usr/share/nginx/html/preload[.]conf;
  }

  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/index.html $uri/ /index.html;
  }

  location /auth/info {
    proxy_pass ${REACT_APP_USER_INFO_URL};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /status {
    stub_status on;
    access_log   off;
  }

  # Prevent clients from accessing hidden files (starting with a dot)
  # This is particularly important if you store .htpasswd files in the site hierarchy
  location ~* (?:^|/)\. {
    deny all;
  }

  # Prevent clients from accessing to backup/config/source files
  location ~* (?:\.(?:bak|config|sql|fla|psd|ini|log|sh|inc|swp|dist)|~)$ {
    deny all;
  }

  # Cross domain webfont access
  location ~* \.(?:ttf|ttc|otf|eot|woff|woff2)$ {
    # Cross domain AJAX requests

    # http://www.w3.org/TR/cors/#access-control-allow-origin-response-header

    # **Security Warning**
    # Do not use this without understanding the consequences.
    # This will permit access from any other website.
    #
    add_header "Access-Control-Allow-Origin" "*";

    # Instead of using this file, consider using a specific rule such as:
    #
    # Allow access based on [sub]domain:
    # add_header "Access-Control-Allow-Origin" "subdomain.example.com";

    # Other CORS
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, PUT, PATCH, DELETE";
    add_header "Access-Control-Allow-Headers" "X-Requested-With,content-type";
    add_header "Access-Control-Allow-Credentials" "true";

    # Also, set cache rules for webfonts.
    #
    # See http://wiki.nginx.org/HttpCoreModule#location
    # And https://github.com/h5bp/server-configs/issues/85
    # And https://github.com/h5bp/server-configs/issues/86
    expires 1M;
    access_log off;
    add_header Cache-Control "public";
  }


  # cache.appcache, your document html and data
  location ~* \.(?:manifest|appcache|html?|xml|json)$ {
    expires -1;
  }

  # Media: images with webp testing
  location ~* \.(?:jpg|jpeg|gif|png)$ {
    expires 1d;

    if ($http_accept ~* "webp")    { set $webp_accept "true"; }
    if (-f $request_filename.webp) { set $webp_local  "true"; }
    if (!-f $request_filename.webp) { set $webp_accept  "false"; }

    # if WebP variant is available, serve Vary
    if ($webp_local = "true") {
      add_header Vary Accept;
    }

    # if WebP is supported by client, serve it
    if ($webp_accept = "true") {
      rewrite (.*) $1.webp break;
    }
    add_header Cache-Control "public";
  }
  # Media: icons, video, audio, HTC
  location ~* \.(?:ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
    expires 1d;
    add_header Cache-Control "public";
  }

  # CSS and Javascript
  location ~* \.(?:css|js)$ {
    expires 1d;
    #etag on;
    add_header Cache-Control "public";
  }
}
