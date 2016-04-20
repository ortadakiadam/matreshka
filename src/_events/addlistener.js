import initMK from '../_core/init';
import triggerOne from './triggerone';

// adds simple event listener
// used as core of event engine
export default function addListener(object, name, callback, context, info) {
	let x = initMK(object);
	const {events: allEvents} = x,
		ctx = context || object,
		events = allEvents[name],
		evt = {
			callback: callback,
			context: context,
			ctx: ctx,
			name: name
		};


	// if there are events with the same name
	if(events) {
		// if there are events with the same data, return false
		for (let i = 0; i < events.length; i++) {
			let evt = events[i];
			if ((evt.callback == callback || evt.callback == callback._callback) && evt.context == context) {
				return false;
			}
		}

		// if the event isn't found add it to the event list
		events.push(evt);
	} else {
		// if there are no events with the same name, create array with only ebent
		allEvents[name] = [evt];
	}

	if(!info || !info.noTrigger) {
		triggerOne(object, `addevent:${name}`, evt);
		triggerOne(object, 'addevent', evt);
	}

	// if event is added return true
	return true;
}