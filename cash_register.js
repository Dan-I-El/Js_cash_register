function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100;
  let unit_amount = [["ONE HUNDRED", 10000], ["TWENTY", 2000], ["TEN", 1000], ["FIVE", 500], ["ONE", 100], ["QUARTER", 25], ["DIME", 10], ["NICKEL", 5], ["PENNY", 1]];
  let exactChange = [];
  let our_cid = cid.reverse();
  for(let m = 0; m < cid.length; m++) {
    our_cid[m][1] *= 100;
  }
  let less = {status: "INSUFFICIENT_FUNDS", change: []};
  let amount = 0;
  for(let a = 0; a < cid.length; a++) {
    amount += cid[a][1];
  }
  if(change === amount) {
    for(let n = 0; n < cid.length; n++) {
      our_cid[n][1] /= 100;
    }
    return {status: "CLOSED", change: cid.reverse()};
  }
  if(change < amount) {
    for(let i = 0; i < unit_amount.length; i++) {
      let changePart = [unit_amount[i][0], 0];
      if(change >= unit_amount[i][1]) {
        for(let c = 0; c < (our_cid[i][1] / unit_amount[i][1]); c++) {
        changePart[1] += unit_amount[i][1];
        change -= unit_amount[i][1];
        if(change < unit_amount[i][1]) break;
        }
        exactChange.push(changePart);
      }
    }
  }
  if(change == 0) {
    for(let e = 0; e < exactChange.length; e++) {
        exactChange[e][1] /= 100;
    }
    return {status: "OPEN", change: exactChange};
  }
  return less;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);