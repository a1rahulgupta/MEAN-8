

import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Injectable()
export class ConfigService {
	
	constructor() {
		
	}

}

export class ValidationService {
}



export function routerTransition() {
	return slideToLeft();
}

export function slideToLeft() {
	return trigger('routerTransition', [
		transition(':enter', [
			style({ transform: 'translateX(100%)', position: 'fixed', width: '100%' }),
			animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
		]),
		transition(':leave', [
			style({ transform: 'translateX(0%)', position: 'fixed', width: '100%' }),
			animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
		])
	]);
}
