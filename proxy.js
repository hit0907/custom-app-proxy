const fs = require('fs');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const targetUrl = 'https://app.exirio.com/';
// const targetUrl = 'https://ui-dev.exirio-dev.com/';

app.use(
  '/',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyRes: manipulateResponse,
  })
);

app.listen(3000);

function manipulateResponse(proxyRes, req, res) {
  proxyRes.headers[
    'content-security-policy'
  ] = `default-src 'self' *.exirio.com *.exirio-dev.com *.tawk.to ipv4.icanhazip.com api.ipify.org maps.googleapis.com www.google-analytics.com *.plaid.com blob: data: wss:; img-src *; script-src 'self' 'unsafe-inline' *; style-src 'self' 'unsafe-inline' *; object-src 'none'; font-src *; worker-src 'self' blob:; frame-ancestors app://localhost;`;
  proxyRes.headers['X-Frame-Options'] =
    'ALLOW-FROM *.exirio.com *.exirio-dev.com *.vezgo.com *.flanks.io *.plaid.com';
}
