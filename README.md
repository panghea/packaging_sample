
## setup
`npm install -g ava yarn`  
`yarn `

## test
`ava`

## watch and automatically run tests
`ava --watch`


## last output results
```
DeliverInfo {
  Qty: 60,
  Item: 'candy#14',
  MaxFill: 26,
  SoldTo: 'Joe',
  DeliverNumber: 1,
  Remain: 60 }
 
**PLUS**:26:remainValue:34
**PLUS**:26:remainValue:8
**MINUS**:8
---------------------
 
DeliverInfo {
  Qty: 55,
  Item: 'candy#14',
  MaxFill: 26,
  SoldTo: 'Qin',
  DeliverNumber: 10,
  Remain: 55 }
 
**PLUS**:18:remainValue:37
**PLUS**:26:remainValue:11
**MINUS**:11
---------------------
 
DeliverInfo {
  Qty: 30,
  Item: 'candy#14',
  MaxFill: 26,
  SoldTo: 'Yo',
  DeliverNumber: 11,
  Remain: 30 }
**PLUS**:15:remainValue:15
**MINUS**:15
 
---------------------
DeliverInfo {
  Qty: 40,
  Item: 'candy#14',
  MaxFill: 26,
  SoldTo: 'Moe',
  DeliverNumber: 12,
  Remain: 40 }
**PLUS**:11:remainValue:29
**PLUS**:26:remainValue:3
**MINUS**:3
[
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 1,
        "Count": 26
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 1,
        "Count": 26
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 1,
        "Count": 8
      },
      {
        "Item": "candy#14",
        "DeliverNumber": 10,
        "Count": 18
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 10,
        "Count": 26
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 10,
        "Count": 11
      },
      {
        "Item": "candy#14",
        "DeliverNumber": 11,
        "Count": 15
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 11,
        "Count": 15
      },
      {
        "Item": "candy#14",
        "DeliverNumber": 12,
        "Count": 11
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 26,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 12,
        "Count": 26
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  },
  {
    "Qty": 3,
    "DeliverInfoList": [
      {
        "Item": "candy#14",
        "DeliverNumber": 12,
        "Count": 3
      }
    ],
    "Item": "candy#14",
    "MaxFill": 26
  }
]

```
