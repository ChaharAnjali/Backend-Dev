# Answers

## CAP Theorem
CAP stands for:
- Consistency (C)
- Availability (A)
- Partition Tolerance (P)

A system can only guarantee two out of these three properties.

---

## 1. Stock Trading Platform
Prioritized: Consistency + Availability (CA)

Justification:
- Financial transactions must be accurate
- No wrong data allowed
- High availability needed for trading

---

## 2. Content Delivery Network
Prioritized: Availability + Partition Tolerance (AP)

Justification:
- Content should always be accessible
- System should work even if network issues occur
- Slight delay in consistency is acceptable

---

## 3. Airline Booking System
Prioritized: Consistency + Partition Tolerance (CP)

Justification:
- Seat booking must be accurate
- No double booking allowed
- Consistency is critical

---

## 4. Video Streaming Service
Prioritized: Availability + Partition Tolerance (AP)

Justification:
- Continuous streaming required
- Minor inconsistencies are acceptable
- High scalability needed