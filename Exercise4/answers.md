# Answers

## Given JSON
{
  "orderId": "12345",
  "orderDate": "2024-01-15",
  "totalAmount": "99.99",
  "items": ["item1", "item2"]
}

---

## Converted BSON

{
  orderId: NumberInt(12345),
  orderDate: ISODate("2024-01-15T00:00:00Z"),
  totalAmount: NumberDecimal("99.99"),
  items: ["item1", "item2"]
}

---

## Explanation

- orderId: Converted from string to integer using NumberInt
- orderDate: Converted to date using ISODate
- totalAmount: Converted to decimal using NumberDecimal
- items: Array remains same