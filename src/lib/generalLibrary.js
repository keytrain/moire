export default {
  howLongAgo: function (dateObj) {
    const today = new Date(),
      date = new Date(dateObj),
      tYear = today.getFullYear(),
      tMonth = today.getMonth() + 1,
      tDay = today.getDate() + 1,
      tHour = today.getHours(),
      tMin = today.getMinutes(),
      tSec = today.getSeconds(),
      rYear = date.getFullYear(),
      rMonth = date.getMonth() + 1,
      rDay = date.getDate() + 1,
      rHour = date.getHours(),
      rMin = date.getMinutes(),
      rSec = date.getSeconds();

    let yDiff = tYear - rYear;
    let moDiff = tMonth - rMonth;
    let dDiff = tDay - rDay;
    let hDiff = tHour - rHour;
    let mDiff = tMin - rMin;
    let sDiff = tSec - rSec;

    // if (rDay === 5) {
    //   console.log(dateObj);
    //   console.log('thour:' + tMin + ' rMin:' + rMin);
    // }

    if (yDiff > 0) {
      // different year but within 12 months
      if (yDiff === 1 && moDiff < 0) {
        return moDiff + 12 + "mo";
      } else {
        return yDiff + "y";
      }
    } else if (moDiff > 0) {
      // different month but within 30 days
      if (moDiff === 1 && dDiff < 0) {
        return dDiff + 30 + "d";
      }
      return moDiff + "mo";
    } else if (dDiff > 0) {
      if (dDiff === 1 && hDiff < 0) {
        return hDiff + 24 + "h";
      }
      return dDiff + "d";
    } else if (hDiff > 0) {
      if (hDiff === 1 && mDiff < 0) {
        return mDiff + 60 + "m";
      }
      return hDiff + "h";
    } else if (mDiff > 0) {
      if (mDiff === 1 && sDiff < 0) {
        return sDiff + 60 + "s";
      }
      return mDiff + "m";
    } else if (sDiff > 0) {
      return sDiff + "s";
    }
    return "Error";
  },

  padZero: function (input) {
    let num = input;
    while (num.length < 3) {
      num = "0" + num;
    }
    return num;
  },
};
