<script setup>
// Recognizable platform marks used across the site for trust + "powered by".
// name: google | google-maps | gbp | gemini | chatgpt | perplexity | meta | instagram | linkedin | google-ads
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <!-- Google "G" -->
  <svg v-if="name === 'google'" viewBox="0 0 48 48" fill="none" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>

  <!-- Google Maps pin -->
  <svg v-else-if="name === 'google-maps'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path fill="#EA4335" d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.1 6.02 11.42 7.03 12.44a.66.66 0 0 0 .94 0C13.48 20.92 19.5 14.6 19.5 9.5 19.5 5.36 16.14 2 12 2z"/>
    <circle cx="12" cy="9.5" r="3.1" fill="#fff"/>
  </svg>

  <!-- Google Business Profile storefront (distinct from the Maps pin) -->
  <svg v-else-if="name === 'gbp'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path fill="#4285F4" d="M3.4 4h17.2l1.35 3.7a1 1 0 0 1-.94 1.35H2.99a1 1 0 0 1-.94-1.35z"/>
    <rect x="4.4" y="9" width="15.2" height="11" rx="1" fill="#1a73e8"/>
    <rect x="10" y="13.4" width="4" height="6.6" fill="#fff"/>
    <rect x="6.2" y="11.4" width="3" height="3" rx="0.4" fill="#fff"/>
    <rect x="14.8" y="11.4" width="3" height="3" rx="0.4" fill="#fff"/>
  </svg>

  <!-- Facebook -->
  <svg v-else-if="name === 'facebook'" viewBox="0 0 24 24" aria-hidden>
    <rect width="24" height="24" rx="5" fill="#1877F2"/>
    <path fill="#fff" d="M16.5 12.03H14v8.47h-3.5v-8.47H8.7V9.1h1.8V7.4c0-2.02 1.2-3.4 3.4-3.4h1.9v2.9h-1.3c-.6 0-.9.3-.9.9v1.3h2.2l-.35 2.93z"/>
  </svg>

  <!-- Gemini spark -->
  <svg v-else-if="name === 'gemini'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <defs><linearGradient id="gemg" x1="0" y1="0" x2="24" y2="24">
      <stop offset="0" stop-color="#4285F4"/><stop offset="0.5" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/>
    </linearGradient></defs>
    <path fill="url(#gemg)" d="M12 1.5c.3 5.55 4.95 10.2 10.5 10.5-5.55.3-10.2 4.95-10.5 10.5-.3-5.55-4.95-10.2-10.5-10.5C7.05 11.7 11.7 7.05 12 1.5z"/>
  </svg>

  <!-- ChatGPT / OpenAI knot -->
  <svg v-else-if="name === 'chatgpt'" viewBox="0 0 24 24" aria-hidden>
    <path fill="#0f172a" d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 22a6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zM13.26 20.6a4.5 4.5 0 0 1-2.88-1.04l.14-.08 4.79-2.76a.78.78 0 0 0 .39-.68V9.29l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.5 4.51zM3.6 16.47a4.48 4.48 0 0 1-.54-3.01l.15.08 4.78 2.76a.78.78 0 0 0 .79 0l5.84-3.37v2.34a.08.08 0 0 1-.03.06L9.75 18.1a4.5 4.5 0 0 1-6.15-1.63zM2.34 6.9a4.5 4.5 0 0 1 2.35-1.98v5.68a.78.78 0 0 0 .39.68l5.82 3.35-2.02 1.17a.07.07 0 0 1-.07 0L3.96 13a4.5 4.5 0 0 1-1.62-6.1zm16.6 3.86l-5.84-3.4L15.12 6.2a.07.07 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.12v-5.68a.78.78 0 0 0-.4-.67zm2.01-3.02l-.14-.09-4.79-2.76a.78.78 0 0 0-.79 0L9.4 8.26V5.92a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.69 4.66zM8.31 11.9L6.29 10.73a.08.08 0 0 1-.04-.05V5.1a4.5 4.5 0 0 1 7.37-3.45l-.14.08L8.7 4.49a.78.78 0 0 0-.39.68zm1.1-2.37L12 8.06l2.6 1.5v3l-2.6 1.5-2.6-1.5z"/>
  </svg>

  <!-- Perplexity -->
  <svg v-else-if="name === 'perplexity'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path stroke="#20808D" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 3.2v17.6M4.6 7.5 12 12l7.4-4.5M4.6 7.5v9L12 21l7.4-4.5v-9M4.6 7.5 12 3.2l7.4 4.3"/>
  </svg>

  <!-- Meta -->
  <svg v-else-if="name === 'meta'" viewBox="0 0 48 24" fill="none" aria-hidden>
    <defs><linearGradient id="metag" x1="0" y1="0" x2="48" y2="0"><stop offset="0" stop-color="#0064E1"/><stop offset="1" stop-color="#19AFFF"/></linearGradient></defs>
    <path fill="url(#metag)" d="M8.7 3C4.9 3 2.4 6.4 2.4 12.1c0 6 2.7 9 6.1 9 2.6 0 4.3-1.9 6.6-6l2-3.6c.5.9 1 1.8 1.6 2.9l1.4 2.4C24 20.7 25.8 22 28.4 22c3.6 0 5.7-3.1 5.7-9.1 0-6.1-2.6-9.9-6.6-9.9-2.4 0-4.3 1.7-6.3 5-.8-1.3-1.5-2.4-2.1-3.3C17.4 3.9 15.4 3 13.3 3c-.1 0-.1 0 0 0zm.3 3.1c1.2 0 2.2 1 3.9 3.6l1.2 1.9-1.9 3.3c-1.5 2.5-2.5 3.2-3.5 3.2-1.4 0-2.8-1.9-2.8-6 0-3.8 1.2-6 3.1-6zm18.8 0c1.9 0 3.1 2.2 3.1 6 0 4.1-1.3 6-2.7 6-1 0-1.9-.8-3.2-2.9l-1.8-3 1.4-2.4c1.6-2.6 2.4-3.7 3.2-3.7z"/>
  </svg>

  <!-- Instagram -->
  <svg v-else-if="name === 'instagram'" viewBox="0 0 24 24" aria-hidden>
    <defs><radialGradient id="igg" cx="0.3" cy="1" r="1"><stop offset="0" stop-color="#FFD776"/><stop offset="0.35" stop-color="#F3736B"/><stop offset="0.7" stop-color="#D6318E"/><stop offset="1" stop-color="#7E37B8"/></radialGradient></defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igg)"/>
    <circle cx="12" cy="12" r="4.4" fill="none" stroke="#fff" stroke-width="1.9"/>
    <circle cx="17.2" cy="6.8" r="1.3" fill="#fff"/>
  </svg>

  <!-- LinkedIn -->
  <svg v-else-if="name === 'linkedin'" viewBox="0 0 24 24" aria-hidden>
    <rect width="24" height="24" rx="5" fill="#0A66C2"/>
    <path fill="#fff" d="M7.1 9.3H4.5V19h2.6V9.3zM5.8 8.1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19.5 19h-2.6v-4.9c0-1.3-.5-2-1.5-2-1.1 0-1.7.7-1.7 2V19H11V9.3h2.5v1.2c.4-.7 1.4-1.5 2.9-1.5 2 0 3.1 1.3 3.1 3.9V19z"/>
  </svg>

  <!-- Google Ads -->
  <svg v-else-if="name === 'google-ads'" viewBox="0 0 24 24" aria-hidden>
    <path fill="#FBBC04" d="M3.2 15.6 9 5.5a2.6 2.6 0 0 1 4.5 2.6L7.7 18.2A2.6 2.6 0 0 1 3.2 15.6z"/>
    <path fill="#4285F4" d="M20.8 15.6 15 5.5a2.6 2.6 0 0 0-4.5 2.6l5.8 10.1a2.6 2.6 0 0 0 4.5-2.6z"/>
    <circle cx="6" cy="18" r="2.6" fill="#34A853"/>
  </svg>

  <!-- Google voice-search microphone (4-color) -->
  <svg v-else-if="name === 'google-mic'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <defs><linearGradient id="micg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4285F4"/><stop offset="0.34" stop-color="#EA4335"/>
      <stop offset="0.67" stop-color="#FBBC05"/><stop offset="1" stop-color="#34A853"/>
    </linearGradient></defs>
    <rect x="9" y="3" width="6" height="11" rx="3" fill="url(#micg)"/>
    <path d="M6 11a6 6 0 0 0 12 0" stroke="#5f6368" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M12 17v3.2M9 20.4h6" stroke="#5f6368" stroke-width="1.6" stroke-linecap="round"/>
  </svg>

  <!-- Google Lens -->
  <svg v-else-if="name === 'google-lens'" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 8.5V6.5A2.5 2.5 0 0 1 6.5 4H8.5M15.5 4H17.5A2.5 2.5 0 0 1 20 6.5V8.5M20 15.5V17.5A2.5 2.5 0 0 1 17.5 20H15.5M8.5 20H6.5A2.5 2.5 0 0 1 4 17.5V15.5" stroke="#5f6368" stroke-width="1.7" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="3.1" fill="#4285F4"/>
    <circle cx="12" cy="12" r="1.15" fill="#fff"/>
    <circle cx="17" cy="7" r="1.15" fill="#EA4335"/>
  </svg>
</template>
