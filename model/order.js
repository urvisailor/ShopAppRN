import {moment} from 'moment';
class Order {
  constructor(id, items, totamt, date) {
    (this.id = id), (this.items = items);
    this.totamt = totamt;
    this.date = date;
  }
  get readableDate() {
    return this.date.moment.local('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
export default Order;
