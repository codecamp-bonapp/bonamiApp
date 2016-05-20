import {Pipe} from 'angular2/core';

@Pipe({
	name: 'money'
})
export class Money {
	transform(value, args) {
		var currency = Number(value);
		return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
}