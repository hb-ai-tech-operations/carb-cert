# Google Ads — landing URLs and conversions (Carb Cert)

Use this map so ad copy, keywords, and final URLs stay aligned with on-page H1s and meta (see `[docs/seo-keyword-map.md](seo-keyword-map.md)`).

## Google tag

- **GA4 Measurement ID**: `G-KZEGZF7FEV` — loaded via `GoogleAnalytics` from `@next/third-parties/google` in `[app/layout.tsx](../app/layout.tsx)`.
- **Google Ads Tag ID**: `AW-18036832686` — configured via `gtag('config', ...)` in a `next/script` block in the same layout. Both IDs live in `[constants/analytics.ts](../constants/analytics.ts)`.

## Conversion (paid lead)

- **Event:** Fires after a **successful Stripe payment** on the compliance flow.
- **Implementation:** `[trackLeadFormPaidConversion](../lib/analytics/google-ads-conversion.ts)` calls `sendGAEvent('event', 'conversion', { send_to, value, currency })`.
- `**send_to` constant:\*\* `[GOOGLE_ADS_LEAD_FORM_CONVERSION_SEND_TO](../constants/analytics.ts)` = `AW-18036832686/sPbRCL3ms44cEK7z0JhD`.
- **Value:** Payment amount in USD (from the PaymentIntent); falls back to `1` if amount is missing (see form submit handler in `[features/compliance-form/components/form-card.tsx](../features/compliance-form/components/form-card.tsx)`).

**Checklist in Google Ads:** Ensure a conversion action exists for that label and that primary/secondary conversion settings match how you optimize bidding.

## Suggested ad group → landing URL

| Ad group theme                                  | Final URL                                    | Message match (headline / description hints)               |
| ----------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Clean Truck Check / CARB compliance (broad)     | `https://www.carbcert.com/`                  | Match hero: compliance, CTC-VIS, fleets, third-party help. |
| Program education / “what is Clean Truck Check” | `https://www.carbcert.com/clean-truck-check` | Rules, GVWR, CTC-VIS, testing at authorized facilities.    |
| High intent — start filing / pay / certificate  | `https://www.carbcert.com/compliance-form`   | Match H1: start filing; fee included; not CARB.            |

Do **not** point search ads at `/send-reminder` (internal, `noindex`).

## Negatives and policy

- Add negatives for irrelevant `seo-data` noise (e.g. diet “carb”, wine, unrelated “california carbon” terms if they match too broadly).
- Keep **third-party / not affiliated with CARB** language on landing pages and in ad transparency where appropriate.
