# UAT Checklist — User Acceptance Testing
## POC #31 — Power Outage & Grid Stress Map

**Test Date:** 2026-06-08
**Tester:** Abhijith K S
**Result:** ✅ PASS

---

## Functional Tests

| Test | Action | Expected | Result |
|---|---|---|---|
| Data Loading | Refresh page | Outage data loads within 2 seconds | ✅ PASS |
| Data Correctness | Check markers vs sidebar | Regions match coordinates | ✅ PASS |
| Filter — High | Select High in dropdown | Only red markers visible, count = 4 | ✅ PASS |
| Filter — Medium | Select Medium in dropdown | Only orange markers visible, count = 3 | ✅ PASS |
| Filter — Low | Select Low in dropdown | Only yellow markers visible, count = 3 | ✅ PASS |
| Filter — All | Select All Severities | All markers visible, count = 15 | ✅ PASS |
| Tooltip | Click any marker | Popup shows region, severity, customers | ✅ PASS |
| Download | Click Download Sample Data | CSV file downloads | ✅ PASS |
| Sidebar Scroll | Scroll sidebar | All panels accessible | ✅ PASS |
| Map Zoom | Click + / - buttons | Map zooms in and out | ✅ PASS |

## Final Verdict
**✅ PASS — All functional requirements met**