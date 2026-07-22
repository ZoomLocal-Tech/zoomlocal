// Healthcare self-test lead capture (zoomlocal.in).
//
// The Smile Score / Hearing Test / Eye Test widgets are self-contained external
// embeds that collect the visitor's name/email/phone but never submit the lead
// anywhere. They render their DOM directly into our mount <div>, so we read the
// fields straight from that container when the visitor proceeds, and POST the
// lead to the healthcare-lead-notify edge function (which emails the team).
//
// Deliberate workaround for widgets we don't control: coupled to the widget
// rendering an input[type=email] inside the mount div. If that ever changes,
// capture silently stops (nothing else breaks) and we log a one-time warning.

const NOTIFY_URL =
  'https://mvnifwlysiomcztpefar.supabase.co/functions/v1/healthcare-lead-notify'
// Not a secret (shipped to the browser); a speed bump against random hits.
const NOTIFY_TOKEN = 'zl-health-lead-2026'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readField(container, selectors) {
  const el = container.querySelector(selectors)
  return (el && el.value ? el.value : '').trim()
}

/**
 * Watch a mounted widget container and forward completed leads. Returns a
 * teardown that removes the listener (call it when the widget unmounts).
 * @param {HTMLElement} container
 * @param {string} toolSlug  "smile-score" | "hearing-test" | "eye-test"
 * @returns {() => void}
 */
export function installHealthcareLeadCapture(container, toolSlug) {
  const sent = new Set()
  let warnedNoEmail = false

  const onClick = (e) => {
    const target = e.target
    if (!target || !target.closest || !target.closest('button, [role="button"], input[type="submit"], a')) return

    const email = readField(
      container,
      'input[type="email"], input[autocomplete="email"]',
    ).toLowerCase()

    if (!EMAIL_RE.test(email)) {
      if (!container.querySelector('input[type="email"], input[autocomplete="email"]') && !warnedNoEmail) {
        warnedNoEmail = true
        console.warn(`[healthcareLeadCapture] no email field found in "${toolSlug}" widget; capture inactive`)
      }
      return
    }

    const key = `${toolSlug}:${email}`
    if (sent.has(key)) return // de-dupe: one send per email per tool
    sent.add(key)

    const name = readField(
      container,
      'input[autocomplete="name"], input[id*="name"], input[data-role*="name"]',
    )
    const phone = readField(
      container,
      'input[type="tel"], input[autocomplete="tel"], input[id*="phone"], input[id*="mobile"], input[data-role*="phone"]',
    )

    try {
      fetch(NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          token: NOTIFY_TOKEN,
          tool: toolSlug,
          name,
          email,
          phone,
          source: typeof location !== 'undefined' ? location.host : '',
          page_url: typeof location !== 'undefined' ? location.href : '',
        }),
      }).catch(() => sent.delete(key)) // allow a retry on the next click
    } catch (_) {
      sent.delete(key)
    }
  }

  // Capture phase so the click is seen even if the widget calls stopPropagation.
  container.addEventListener('click', onClick, true)
  return () => container.removeEventListener('click', onClick, true)
}
