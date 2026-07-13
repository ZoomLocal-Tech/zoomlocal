<script setup>
import { ref, reactive } from 'vue'
import { Send, Loader2, CheckCircle2 } from 'lucide-vue-next'

const CONTACT_EMAILS = [
  'manu.mani@zoomlocal.in',
  'anand.mahajan@zoomlocal.in',
  'kedar.deshmukh@zoomlocal.in',
  'harsimar.singh@zoomlocal.in',
]

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const form = reactive({
  name: '',
  email: '',
  phone: '',
  businessName: '',
  locations: '1',
  message: '',
})

const isSubmitting = ref(false)
const error = ref('')
const submitted = ref(false)

const inputClass =
  'w-full bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 transition-colors'

async function handleSubmit() {
  error.value = ''
  isSubmitting.value = true

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-managed-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        businessName: form.businessName,
        locations: form.locations,
        message: form.message,
        plan: 'managed',
        source: 'zoomlocal.in',
        to: CONTACT_EMAILS,
      }),
    })

    if (!response.ok) throw new Error('Failed to send')

    // Conversion tracking (if GTM is present)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'managed_form_submit',
      form_name: 'managed_seo_inquiry',
      business_name: form.businessName,
      locations: form.locations,
    })

    submitted.value = true
  } catch (err) {
    console.error('[ManagedContactForm] error:', err)
    error.value = 'Something went wrong. Please try again or reach us on WhatsApp.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div v-if="submitted" class="text-center py-6">
    <div class="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
      <CheckCircle2 class="w-8 h-8 text-green-400" />
    </div>
    <h3 class="text-2xl font-bold text-white mb-2">Thank you!</h3>
    <p class="text-gray-400">
      Our Local SEO team will reach out within 24 hours. Want to talk sooner? Message us on WhatsApp.
    </p>
  </div>

  <form v-else @submit.prevent="handleSubmit" class="space-y-5">
    <div class="grid md:grid-cols-2 gap-5">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1.5">Your Name *</label>
        <input v-model="form.name" type="text" required :class="inputClass" placeholder="John Doe" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
        <input v-model="form.email" type="email" required :class="inputClass" placeholder="john@business.com" />
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1.5">Phone *</label>
        <input v-model="form.phone" type="tel" required :class="inputClass" placeholder="+91 98765 43210" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1.5">Your Business Name *</label>
        <input v-model="form.businessName" type="text" required :class="inputClass" placeholder="Your business on Google" />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1.5">Number of Locations</label>
      <select
        v-model="form.locations"
        class="w-full bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 transition-colors"
      >
        <option value="1">1 location</option>
        <option value="2-5">2-5 locations</option>
        <option value="6-20">6-20 locations</option>
        <option value="20+">20+ locations</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
      <textarea
        v-model="form.message"
        rows="3"
        class="w-full bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 transition-colors resize-none"
        placeholder="Tell us about your business and what you're looking for..."
      ></textarea>
    </div>

    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl py-4 text-lg font-semibold transition-colors disabled:opacity-60"
    >
      <Loader2 v-if="isSubmitting" class="w-5 h-5 animate-spin" />
      <span>{{ isSubmitting ? 'Sending...' : 'Get Started with Managed SEO' }}</span>
      <Send v-if="!isSubmitting" class="w-5 h-5" />
    </button>
  </form>
</template>
