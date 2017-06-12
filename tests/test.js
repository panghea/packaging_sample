import test from 'ava';
// import moge from '../app/scripts/background';
// import {CalendarStatus, moge} from '../app/scripts/components/CalendarStatus'

/*
test('my passing test', t => {
    t.true("moge" == moge());
});
*/

// Qty Item     MaxFill Sold-To DeliverNumber
// 60  candy#14 26      Joe     1                      26+26+8 = 60
// 55  candy#14 26      Qin     10                     26+26+3 = 55
// 30  candy#14 26      Yo      11                     26+4 = 30
// 40  candy#14 26      Moe     12                     26+14 = 40


class DeliverInfo {
  constructor(qty, item, maxFill, soldTo, deliverNumber) {
    this.Qty = qty;
    this.Item = item;
    this.MaxFill = maxFill;
    this.SoldTo = soldTo;
    this.DeliverNumber = deliverNumber;
    this.Remain = qty;
  }
}

class TransferdDeliverInfo {
  constructor(item, count, deliverNumber) {
    this.Item = item;
    this.DeliverNumber = deliverNumber;
    this.Count = count;
  }
}


class PackageInfo {
  constructor(item, maxFill) {
    this.Qty = 0;
    this.DeliverInfoList = [];
    this.Item = item;
    this.MaxFill = maxFill;
  }
  get Remain() {
    return this.MaxFill - this.Qty;
  }
  addDeliverInfo(deliverInfo) {
    if( this.Item !== deliverInfo.Item || this.Remain === 0 || deliverInfo.Remain === 0) {
      console.error("MOGGGE");
      return ;
    }
    // 60 - 26 = +34
    // 10 - 26 = -16
    let remainValue = deliverInfo.Remain - this.Remain;
    let transferdCount = 0;
    if( remainValue > 0 ) {
      console.log("**PLUS**:" + this.Remain + ":remainValue:" + remainValue);
      // plus
      // DR   PR = RV
      // 60 - 5 = 55
      const cnt = this.Remain; // this is a dynamic property save the value
      this.Qty = this.Qty + this.Remain;
      transferdCount = cnt;
      deliverInfo.Remain = remainValue;
    } else {
      // minus
      console.log("**MINUS**:" +  deliverInfo.Remain);
      this.Qty = this.Qty + deliverInfo.Remain;
      transferdCount = deliverInfo.Remain;
      deliverInfo.Remain = 0;
    }

    let transeferdInfo = new TransferdDeliverInfo(deliverInfo.Item, transferdCount, deliverInfo.DeliverNumber);
    this.DeliverInfoList.push(transeferdInfo);
  }
}

function getAvailablePkgForItem(packageInfoList, deliverInfo) {
  for( let i = 0; i < packageInfoList.length; i++) {
    let pkg = packageInfoList[i];
    if( pkg.Item === deliverInfo.Item &&
      pkg.Remain > 0) {
        return pkg;
    }
  }
  return null;
}

function sum_up_recursive(deliverInfoList, packageInfoList) {
  for(let i = 0; i < deliverInfoList.length; i++) {
    let deliverInfo = deliverInfoList[i];
    console.log("---------------------");
    console.dir(deliverInfo);
    while ( deliverInfo.Remain > 0 ) {
      let packageInfo = getAvailablePkgForItem(packageInfoList, deliverInfo);
      if( packageInfo === null ) {
        // new package
        let packageInfo = new PackageInfo(deliverInfo.Item, deliverInfo.MaxFill);
        packageInfo.addDeliverInfo(deliverInfo);
        packageInfoList.push(packageInfo);
      } else {
        packageInfo.addDeliverInfo(deliverInfo);
      }
    }
  };
}


test('one item to one package remain 1', t => {
  let deliverInfoList = [
    new DeliverInfo(25,'candy#14',26,'Joe',1),
  ];
  let packageInfoList = [
  ]

  //console.dir(deliverInfoList);

  sum_up_recursive(deliverInfoList, packageInfoList);

  console.log(JSON.stringify(packageInfoList, null, 2));

  t.true(deliverInfoList[0].Remain === 0 );  // no remain
  t.true(packageInfoList.length === 1);  // one package

  // 1 = 26 - 25
  t.true(packageInfoList[0].Remain === 1);
  t.true(packageInfoList[0].Qty === 25);
  t.true(packageInfoList[0].DeliverInfoList.length === 1);
  t.true(packageInfoList[0].DeliverInfoList[0].Count === 25); // 25 items into one package

});

test('one item to one package remain 0', t => {
  let deliverInfoList = [
    new DeliverInfo(26,'candy#14',26,'Joe',1),
  ];
  let packageInfoList = [
  ]

  //console.dir(deliverInfoList);

  sum_up_recursive(deliverInfoList, packageInfoList);

  console.log(JSON.stringify(packageInfoList, null, 2));

  t.true(deliverInfoList[0].Remain === 0 );  // no remain
  t.true(packageInfoList.length === 1);  // one package

  // 0 = 26 - 26
  t.true(packageInfoList[0].Remain === 0);
  t.true(packageInfoList[0].Qty === 26);
  t.true(packageInfoList[0].DeliverInfoList.length === 1);
  t.true(packageInfoList[0].DeliverInfoList[0].Count === 26); // 26 items into one package

});

test('one item to two package remain 25', t => {
  let deliverInfoList = [
    new DeliverInfo(27,'candy#14',26,'Joe',1),
  ];
  let packageInfoList = [
  ]

  //console.dir(deliverInfoList);

  sum_up_recursive(deliverInfoList, packageInfoList);

  console.log(JSON.stringify(packageInfoList, null, 2));

  t.true(deliverInfoList[0].Remain === 0 );  // no remain
  t.true(packageInfoList.length === 2);  // two package

  // 26 = 27 - 26
  t.true(packageInfoList[0].Remain === 0);
  t.true(packageInfoList[0].Qty === 26);
  t.true(packageInfoList[0].DeliverInfoList.length === 1);
  t.true(packageInfoList[0].DeliverInfoList[0].Count === 26); // 26 items into one package

  // 1 = 27 - 26
  t.true(packageInfoList[1].Remain === 25);
  t.true(packageInfoList[1].Qty === 1);
  t.true(packageInfoList[1].DeliverInfoList.length === 1);
  t.true(packageInfoList[1].DeliverInfoList[0].Count === 1); // 1 items into two package
});

test('two item to two package remain 25', t => {
  let deliverInfoList = [
    new DeliverInfo(25,'candy#14',26,'Joe',1),
    new DeliverInfo(10,'candy#14',26,'Qin',10),
  ];
  let packageInfoList = [
  ]

  //console.dir(deliverInfoList);

  sum_up_recursive(deliverInfoList, packageInfoList);

  console.log(JSON.stringify(packageInfoList, null, 2));


  t.true(deliverInfoList[0].Remain === 0 );  // no remain
  t.true(packageInfoList.length === 2);  // two package

  t.true(packageInfoList[0].Remain === 0);
  t.true(packageInfoList[0].Qty === 26);
  t.true(packageInfoList[0].DeliverInfoList.length === 2);

  t.true(packageInfoList[0].DeliverInfoList[0].Count === 25);
  t.true(packageInfoList[0].DeliverInfoList[0].DeliverNumber === 1);

  t.true(packageInfoList[0].DeliverInfoList[1].Count === 1);
  t.true(packageInfoList[0].DeliverInfoList[1].DeliverNumber === 10);

  // 17 = 26 - 9
  t.true(packageInfoList[1].Remain === 17);
  t.true(packageInfoList[1].Qty === 9);
  t.true(packageInfoList[1].DeliverInfoList.length === 1);
  t.true(packageInfoList[1].DeliverInfoList[0].Count === 9);
  t.true(packageInfoList[1].DeliverInfoList[0].DeliverNumber === 10);
});

test('4 item to 8 package', t => {
  let deliverInfoList = [
    new DeliverInfo(60,'candy#14',26,'Joe',1),
    new DeliverInfo(55,'candy#14',26,'Qin',10),
    new DeliverInfo(30,'candy#14',26,'Yo',11),
    new DeliverInfo(40,'candy#14',26,'Moe',12),
  ];
  let packageInfoList = [
  ]

  //console.dir(deliverInfoList);

  sum_up_recursive(deliverInfoList, packageInfoList);

  console.log(JSON.stringify(packageInfoList, null, 2));


  t.true(deliverInfoList[0].Remain === 0 );  // no remain
  t.true(packageInfoList.length === 8);  // 8 package

  t.true(packageInfoList[0].Remain === 0);
  t.true(packageInfoList[0].Qty === 26);
  t.true(packageInfoList[0].DeliverInfoList.length === 1);

  t.true(packageInfoList[7].Remain === 23);
  t.true(packageInfoList[7].Qty === 3);
  t.true(packageInfoList[7].DeliverInfoList.length === 1);
  t.true(packageInfoList[7].DeliverInfoList[0].Count === 3);
  t.true(packageInfoList[7].DeliverInfoList[0].DeliverNumber === 12);
});

